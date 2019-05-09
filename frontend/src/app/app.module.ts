import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule ,MatCardModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { OrgModule } from './org/org.module';
import { PeerModule } from './peer/peer.module';
@NgModule({
  declarations: [
    AppComponent,
    AddPeerComponent,
    AddOrgComponent,
    AddOrdererComponent,
    AddChannelComponent,
    PeerDetailComponent,
    OrdererDetailComponent,
    OrgDetailComponent,
    ChannelDetailComponent,
    NewNetworkComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatCardModule,
    OrgModule,
    PeerModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
