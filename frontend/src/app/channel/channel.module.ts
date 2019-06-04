import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { SharedMaterialModule } from '../shared-material.module.';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateChannelComponent],
  imports: [
    CommonModule,SharedMaterialModule,ReactiveFormsModule,
  ],
  exports:[SharedMaterialModule]
})
export class ChannelModule { }
