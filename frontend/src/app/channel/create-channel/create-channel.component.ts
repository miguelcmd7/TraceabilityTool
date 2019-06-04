import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { OrgSimple } from "src/app/models/orgSimple";
import { ChannelService } from "../channel.service";
import { PeerService } from "src/app/peer/peer.service";
import { OrdererSimple } from "src/app/models/ordererSimple";
import { OrdererService } from "src/app/orderer/orderer.service";
import { successManager, errorManager } from 'src/app/utils/util';

@Component({
  selector: "app-create-channel",
  templateUrl: "./create-channel.component.html",
  styleUrls: ["./create-channel.component.css"]
})
export class CreateChannelComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  netDomain: String;
  orgs: OrgSimple[];
  updating: boolean;
  peersString: string[] = [];
  channelId: String = null;
  peersByOrg: any[];
  orderers: OrdererSimple[];

  constructor(
    private formBuilder: FormBuilder,
    private channelService: ChannelService,
    private toastr: ToastrService,
    private _Activatedroute: ActivatedRoute,
    private peerService: PeerService,
    private ordererService: OrdererService
  ) {
    this.netDomain = null;
    this.orgs = null;
  }

  ngOnInit() {
    this._Activatedroute.params.subscribe(params => {
      console.log("URL changes");
      this.channelId = params["channelId"];

      if (this.channelId != null) {
      }
      // this.channelService.getChannel(this.channelId).then(data => {
      //   //console.log("El subtring es "+)
      //   this.updating = true;
      //   this.registerForm = this.formBuilder.group({
      //     name: [data.name, Validators.required],
      //     orderer: [
      //       {
      //         value: data.orderer.substr(0, data.orderer.indexOf(".")),
      //         disabled: true
      //       },
      //       [Validators.required]
      //     ],
      //     consortium: [data.consortium, [Validators.required]]
      //   });
      // });
    });
    if (this.channelId == null) {
      this.registerForm = this.formBuilder.group({
        name: [null, Validators.required],
        orderer: [null, [Validators.required]],
        consortium: ["SampleConsortium", [Validators.required]]
      });
    }

    this.peerService.getPeers().then(
      data => {
        let temp = [];
        data.forEach((peers, key, map) => {
          temp.push({ orgId: key, peers: peers });
        });
        this.peersByOrg = temp;
      },
      err => {
        //TODO call our
        console.log(err);
        this.orgs = [];
      }
    );
    this.ordererService.getOrderers().then(data => {
      this.orderers = data;
    });
  }
  addPeer() {
    let name = "peer" + this.peersString.length;
    this.registerForm.addControl(
      name,
      new FormControl(null, Validators.required)
    );
    this.peersString.push(name);
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    //this.submitted = true;
    //console.log(this.registerForm.controls.orgId)
    //console.log(this.registerForm.controls.orgId)
    console.log("Submiting");
    this.channelService.addChannel(this.registerForm.value).then(
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

  }

  onUpdate() {
    // let config  = new PeerConfig(this.registerForm.value.extPort,this.registerForm.value.intPort,this.registerForm.value.anchor)
    // console.log(config.toJSON())
    // this.peerService.updatePeer(this.peerId,this.orgId, config)
    console.log("Updating");
  }
  onDelete() {
    console.log("DEleting...");
  }
  getNameErrorMessage() {
    return ''
  }
  getConsortiumErrorMessage() {
    return ''
  }
  getOrdererErrorMessage() {
    return ''
  }
  getPeerErrorMessage() {
    return ''
  }
}
