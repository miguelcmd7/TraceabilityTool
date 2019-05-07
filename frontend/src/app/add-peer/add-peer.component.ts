import { Component, OnInit } from '@angular/core';
import {PeerService} from '../peer-service';
import {OrgService} from '../org.service'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Org } from '../org';

@Component({
  selector: 'app-add-peer',
  templateUrl: './add-peer.component.html',
  styleUrls: ['./add-peer.component.css']
})
export class AddPeerComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  orgs:Org[] 
  constructor(private formBuilder: FormBuilder,private orgService:OrgService, private peerService:PeerService) {

    this.orgs =[]
  }

  //private tags: Org[] ; 
  //constructor(private peerService: PeerService, private orgService:OrgService) { }

  ngOnInit() { 
    this.orgService.getOrgs().then((orgs)=>{
      this.orgs = orgs;
    })

    this.registerForm = this.formBuilder.group(
      {
        peerId: ["asdf", Validators.required],
        name: ["asdf", Validators.required],
        organization:["",Validators.required],
        intPort: [7050, [Validators.required, Validators.maxLength(5)]],
        extPort: ["", Validators.required, Validators.maxLength(5)]
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log(this.registerForm.value);
    // //  this.peerService.addPeer(t).subscribe((data)=>{
    // //    this.submitted= true;
    // //    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data));
    // //  },(err)=>{
    // //    alert("Error!! :-)\n\n" + err);
    // //  }
       
    //  )
 
   }

}
