import { Component, OnInit } from '@angular/core';
import { OrdererService } from '../orderer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NetworkService } from 'src/app/network/network.service';
import { ToastrService } from 'ngx-toastr';
import {errorManager,successManager} from 'src/app/utils/util';

@Component({
  selector: 'app-create-orderer',
  templateUrl: './create-orderer.component.html',
  styleUrls: ['./create-orderer.component.css']
})
export class CreateOrdererComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  netDomain : String;

  constructor(private formBuilder: FormBuilder,private oredererService:OrdererService, private netService:NetworkService,private toastr:ToastrService) {
    this.netDomain = null;

  }

  ngOnInit() {
    this.netDomain = this.netService.getDomain();
    this.registerForm = this.formBuilder.group(
      {
        name: ["Orderer", Validators.required],
        id: ["orderer", [Validators.required]],
        extPort: [null, [Validators.required]],
        intPort: [7050, []]
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // console.log(this.registerForm.controls.orgId)
    // console.log(this.registerForm.controls.orgId)
    
    if(this.registerForm.valid &&!this.registerForm.pending){
      console.log(this.registerForm.value);
      this.oredererService.addOrderer(this.registerForm.value).then((data)=>{
        
        successManager(this.toastr, "Orderer "+ this.registerForm.value.name+" created", null)
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
    getIdErrorMessage(){
      return this.f.orgId.hasError('required') ? 'Organization is required' :
      '';
    }
    getExtPortErrorMessage(){
      return this.f.extPort.hasError('required') ? 'External port is required' :
      '';
    }


}
