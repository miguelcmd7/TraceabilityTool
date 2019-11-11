import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MainNavComponent} from './main-nav.component'

import { SharedMaterialModule } from '../shared-material.module.';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule ,MatCardModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { OrgModule } from '../org/org.module';
import { PeerModule } from '../peer/peer.module';
import { OrdererModule } from '../orderer/orderer.module';
import { ToastrModule } from 'ngx-toastr';
import { NetworkModule } from '../network/network.module';
import { ChannelModule } from '../channel/channel.module';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ChaincodeModule } from '../chaincode/chaincode.module';



@NgModule({
  declarations: [MainNavComponent],
  imports: [    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,SharedMaterialModule,ReactiveFormsModule,ChaincodeModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatCardModule,
    OrgModule,
    PeerModule,
    OrdererModule,
    NetworkModule,
    ChannelModule,
    ChaincodeModule,
  ],
  exports:[SharedMaterialModule,MainNavComponent]
})
export class MainNavModule { }
