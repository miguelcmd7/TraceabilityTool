import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrgComponent } from './create-org/create-org.component';
import { SharedMaterialModule } from '../shared-material.module.';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateOrgComponent],
  imports: [
    CommonModule,SharedMaterialModule,ReactiveFormsModule,
  ],
  exports:[SharedMaterialModule]
})
export class OrgModule { }
