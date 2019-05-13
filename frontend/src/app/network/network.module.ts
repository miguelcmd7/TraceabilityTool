import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNetworkComponent } from './create-network/create-network.component';
import { NotNetworkComponent } from './not-network/not-network.component';
import { SharedMaterialModule } from '../shared-material.module.';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateNetworkComponent, NotNetworkComponent],
  imports: [
    CommonModule,SharedMaterialModule,ReactiveFormsModule,
  ],
  exports:[SharedMaterialModule,NotNetworkComponent]
})
export class NetworkModule { }
