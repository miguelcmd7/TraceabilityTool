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
    this.submitted= true;
    //this.registerForm.invalid
    console.log("Valid "+this.registerForm.valid)
    console.log("Pending "+this.registerForm.pending)
    console.log("Invalid "+this.registerForm.invalid)
    if(this.registerForm.valid &&!this.registerForm.pending){
      console.log(this.registerForm.value);
      this.orgService.addOrg(this.registerForm.value).then((data)=>{
        
        alert("SUCCESS!! :-)\n\n" + JSON.stringify(data));
      },(err)=>{
        alert("Error1!! :-)\n\n" + err);
      })
    }else{
      console.log("Form is invalid")
    }
   }

}
