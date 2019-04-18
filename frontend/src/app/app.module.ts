import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddPeerComponent } from './add-peer/add-peer.component';
import { AddOrgComponent } from './add-org/add-org.component';
import { AddOrdererComponent } from './add-orderer/add-orderer.component';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { PeerDetailComponent } from './peer-detail/peer-detail.component';
import { OrdererDetailComponent } from './orderer-detail/orderer-detail.component';
import { OrgDetailComponent } from './org-detail/org-detail.component';
import { ChannelDetailComponent } from './channel-detail/channel-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { NewNetworkComponent } from './new-network/new-network.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AddPeerComponent,
    AddOrgComponent,
    AddOrdererComponent,
    AddChannelComponent,
    PeerDetailComponent,
    OrdererDetailComponent,
    OrgDetailComponent,
    ChannelDetailComponent,
    NewNetworkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
