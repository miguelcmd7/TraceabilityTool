import { Component, OnInit } from '@angular/core';
import { PeerService } from '../peer.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OrgService } from 'src/app/org/org.service';

@Component({
  selector: 'app-create-peer',
  templateUrl: './create-peer.component.html',
  styleUrls: ['./create-peer.component.css']
})
export class CreatePeerComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  netDomain : String;

  constructor(private formBuilder: FormBuilder,private orgService:OrgService, private peerService:PeerService) {
    this.netDomain = null;

  }

  ngOnInit() {
    
    this.registerForm = this.formBuilder.group(
      {
        orgId: [null, Validators.required],
        intPort: [7050, [Validators.required]],
        extPort: [null, [Validators.required]],
        id: ["peer", Validators.required],
        anchor: [false, Validators.required]
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.controls.orgId)
    console.log(this.registerForm.controls.orgId)
    
    if(this.registerForm.valid &&!this.registerForm.pending){
      // console.log(this.registerForm.value);
      // this.orgService.addOrg(this.registerForm.value).then((data)=>{
        
      //   alert("SUCCESS!! :-)\n\n" + JSON.stringify(data));
      // },(err)=>{
      //   alert("Error1!! :-)\n\n" + err);
      // })
    }else{
      console.log("Form is invalid")
    }
  }
  getIdErrorMessage(){
      return this.f.id.hasError('required') ? 'You must enter a value' :
              '';
    }
    getOrgIdErrorMessage(){
      return '';
    }
    getExtPortErrorMessage(){
      return '';
    }
    getIntPortErrorMessage(){
      return '';
    }
}
