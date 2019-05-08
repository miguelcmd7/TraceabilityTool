import { Component, OnInit } from '@angular/core';
import {PeerService} from '../peer-service';
import {OrgService} from '../org.service'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
  
@Component({
  selector: 'app-add-peer',
  templateUrl: './add-peer.component.html',
  styleUrls: ['./add-peer.component.css']
})
export class AddPeerComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private orgService:OrgService, private peerService:PeerService) {}

  //private tags: Org[] ; 
  //constructor(private peerService: PeerService, private orgService:OrgService) { }

  ngOnInit() { 
    this.registerForm = this.formBuilder.group(
      {
        orgId: ["asdf", Validators.required],
        domain: ["asdf", Validators.required],
        mspId: ["asdf", [Validators.required]],
        intPort: [7050, [Validators.required]],
        extPort: ["", Validators.required]
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log(this.registerForm.value);
     this.orgService.addOrg(this.registerForm.value).then((data)=>{
       this.submitted= true;
       alert("SUCCESS!! :-)\n\n" + JSON.stringify(data));
     },(err)=>{
       alert("Error!! :-)\n\n" + err);
     }
       
     )
 
   }

}
