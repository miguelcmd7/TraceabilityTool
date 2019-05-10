import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrgService } from 'src/app/org.service';
import { NetworkService } from 'src/app/network.service';

@Component({
  selector: 'app-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.css']
})
export class CreateOrgComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  netDomain : String;

  constructor(private formBuilder: FormBuilder,private orgService:OrgService, private netService:NetworkService) {
    this.netDomain = null;

  }

  ngOnInit() {
    this.netDomain = this.netService.getDomain();
    this.registerForm = this.formBuilder.group(
      {
        orgId: ["", Validators.required],
        mspId: ["digiMSP", [Validators.required]],
        name: ["Digibank", [Validators.required]],
        ca_name: ["digiCA", Validators.required]
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
  getNameErrorMessage(){
      return this.f.name.hasError('required') ? 'You must enter a value' :
              '';
    }
    getOrgIdErrorMessage(){
      return this.f.orgId.hasError('required') ? 'Organization is required' :
      '';
    }
    getMspIdErrorMessage(){
      return this.f.mspId.hasError('required') ? 'MSP Id is required' :
      '';
    }
    getCaNameErrorMessage(){
      return this.f.ca_name.hasError('required') ? 'CA name is required' :
      '';
    }
}
