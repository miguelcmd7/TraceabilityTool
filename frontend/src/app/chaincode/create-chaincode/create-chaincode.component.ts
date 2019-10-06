import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { successManager, errorManager } from 'src/app/utils/util';

@Component({
  selector: 'app-create-chaincode',
  templateUrl: './create-chaincode.component.html',
  styleUrls: ['./create-chaincode.component.css']
})
export class CreateChaincodeComponent implements OnInit {
  registerForm: FormGroup;
  functionsForm: FormGroup;
  atributesForm:FormGroup;
  submitted = false;
  funcs = []
  atributes =[]
  funcprueba = new Map()

  chaincodeName: String = null;

  constructor(    
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _Activatedroute: ActivatedRoute) { 
      this.funcs = []
      this.atributes =[]
    }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      ChaincodeName: [null, Validators.required],
      AssetName: [null, [Validators.required]],
    });
    this.functionsForm= this.formBuilder.group({})
    this.atributesForm= this.formBuilder.group({})
    this.funcprueba = new Map()
  }

  addFunction() {
    let funcName = "func" + this.funcs.length;
    this.funcprueba.set(funcName,{functionName:funcName, args:'args'+this.funcprueba.size})
    
    this.functionsForm.addControl(
      funcName,
      new FormControl(null, Validators.required)
    );
    this.funcs.push(funcName);
  }
  removeFunction(funcName) {

    this.functionsForm.removeControl( funcName
    );
  }
  addAtributes() {
    let atributeName = "atribute" + this.atributes.length;
    this.atributesForm.addControl(
      atributeName,
      new FormControl(null, Validators.required)
    );
    this.atributes.push(atributeName);
  }

  get f() {
    return this.registerForm.controls;
  }
  get fA() {
    return this.atributesForm.controls;
  }
  get fF() {
    return this.functionsForm.controls;
  }

  getAtrNameErrorMessage(){
    return ''
  }
  getAtrTypeErrorMessage(){
    return ''
  }
  getFuncArgErrorMessage(){
    return ''
  }
  getFuncNameErrorMessage(){
    return ''
  }
  getNameErrorMessage(){
    return ''
  }
  getAssetNameErrorMessage(){
    return ''
  }


}
