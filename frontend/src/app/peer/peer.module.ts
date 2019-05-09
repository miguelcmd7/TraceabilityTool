import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePeerComponent } from './create-peer/create-peer.component';
import { SharedMaterialModule } from '../shared-material.module.';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreatePeerComponent],
  imports: [
    CommonModule,SharedMaterialModule,ReactiveFormsModule,
  ],
  exports:[SharedMaterialModule]
})
export class PeerModule { }
