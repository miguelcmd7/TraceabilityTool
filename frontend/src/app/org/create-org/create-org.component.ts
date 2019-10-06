import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrgService } from 'src/app/org/org.service';
import { NetworkService } from 'src/app/network/network.service';
import {errorManager,successManager} from 'src/app/utils/util';
import { ToastrService } from 'ngx-toastr';
import { OrgSimple } from 'src/app/models/orgSimple';
import { ActivatedRoute } from '@angular/router';
import { NullTemplateVisitor } from '@angular/compiler';
@Component({
  selector: 'app-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.css']
})
export class CreateOrgComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  netDomain : String;
  updating: boolean = false;
  @Input()
  orgId: string = null;
  
  constructor(private formBuilder: FormBuilder,
    private orgService:OrgService, 
    private netService:NetworkService,
     private toastr: ToastrService,
     private _Activatedroute:ActivatedRoute) 
    {
    this.netDomain = null;
    this.updating = false;

  }

  ngOnInit() {
    this._Activatedroute.params.subscribe((params)=>{ this.orgId = params['id'];
  console.log(params)
  console.log(this.orgId)})
    //this._Activatedroute.url.subscribe((data)=>{console.log(data.pop())})
    this.netDomain = this.netService.getDomain();
    if (this.orgId!= null  )
      this.orgService.getOrg(this.orgId).then((data)=>{
        this.updating =true;
        this.registerForm = this.formBuilder.group(
          {
            orgId: [{value: data.orgId, disabled: true}, Validators.required],
            mspId: [data.orgMSP, [Validators.required]],
            name: [data.orgName, [Validators.required]],
            ca_name: [data.cas[0].casId, Validators.required]
          })
      })
    else
    this.registerForm = this.formBuilder.group(
      {
        orgId: ["", Validators.required],
        mspId: ["digiMSP", [Validators.required]],
        name: ["Digibank", [Validators.required]],
        ca_name: ["digiCA", Validators.required]
      })
   
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
        
        successManager(this.toastr, "Organization "+ this.registerForm.value.name+" created", null)
      },(err)=>{
        errorManager(this.toastr,err)
      })
    }else{
      console.log("Form is invalid")
    }
  }
  onUpdate(){
    console.log("Updating...")
    console.log(this.registerForm.controls.orgId)
    
    if(this.registerForm.valid &&!this.registerForm.pending){
      
      this.orgService.updateOrg(this.orgId ,this.registerForm.value).then((data)=>{
        
        successManager(this.toastr, "Organization "+this.orgId +" was updated ", null)
      },(err)=>{
        errorManager(this.toastr,err)
      })
    }else{
      console.log("Form is invalid")
    }
  }
  onDelete(){
    console.log("Deleting...")

    console.log(this.registerForm.controls.orgId)
    
    if(this.registerForm.valid &&!this.registerForm.pending){
      
      this.orgService.deleteOrg(this.orgId).then((data)=>{
        
        successManager(this.toastr, "Organization "+this.orgId +" was deleted ", null)
      },(err)=>{
        errorManager(this.toastr,err)
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
