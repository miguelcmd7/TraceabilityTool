import { Component, OnInit } from '@angular/core';
import { PeerService } from '../peer.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OrgService } from 'src/app/org/org.service';
import { OrgSimple } from 'src/app/models/orgSimple';
import { ToastrService } from 'ngx-toastr';
import { successManager, errorManager } from 'src/app/utils/util';
import { Peer } from 'src/app/models/peer';

@Component({
  selector: "app-create-peer",
  templateUrl: "./create-peer.component.html",
  styleUrls: ["./create-peer.component.css"]
})
export class CreatePeerComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  netDomain: String;
  orgs: OrgSimple[];

  constructor(
    private formBuilder: FormBuilder,
    private orgService: OrgService,
    private peerService: PeerService,
    private toastr: ToastrService
  ) {
    this.netDomain = null;
    this.orgs = null;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      orgId: [null, Validators.required],
      intPort: [7051, [Validators.required]],
      extPort: [null, [Validators.required]],
      id: ["peer", Validators.required],
      anchor: [false, Validators.required]
    });

    this.orgService.getOrgs().then(
      orgs => {
        this.orgs = orgs;
      },
      err => {
        //TODO call our
        console.log(err);
        this.orgs = [];
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    //this.submitted = true;
    //console.log(this.registerForm.controls.orgId)
    //console.log(this.registerForm.controls.orgId)

    if (this.registerForm.valid && !this.registerForm.pending) {
      console.log(this.registerForm.value);
      this.peerService.addPeer(new Peer(this.registerForm.value),this.registerForm.value.orgId).then(
        data => {
          successManager(
            this.toastr,
            "Peer " + this.registerForm.value.name + " created",
            null
          );
        },
        err => {
          errorManager(this.toastr, err);
        }
      );
    } else {
      console.log("Form is invalid");
    }
  }

  getIdErrorMessage() {
    return this.f.id.hasError("required") ? "You must enter a value" : "";
  }
  getOrgIdErrorMessage() {
    return "";
  }
  getExtPortErrorMessage() {
    return "";
  }
  getIntPortErrorMessage() {
    return "";
  }
}
