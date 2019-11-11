import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChaincodeComponent } from './create-chaincode/create-chaincode.component';
import { SharedMaterialModule } from '../shared-material.module.';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateChaincodeComponent],
  imports: [
    CommonModule,SharedMaterialModule,ReactiveFormsModule,
  ],
  exports:[SharedMaterialModule,CreateChaincodeComponent]
})
export class ChaincodeModule { }
