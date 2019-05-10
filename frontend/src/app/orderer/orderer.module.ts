import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrdererComponent } from './create-orderer/create-orderer.component';
import { SharedMaterialModule } from '../shared-material.module.';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateOrdererComponent],
  imports: [
    CommonModule,SharedMaterialModule,ReactiveFormsModule,
  ],
  exports:[SharedMaterialModule]
})
export class OrdererModule { }
