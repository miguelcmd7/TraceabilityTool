import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';

import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule ,MatCardModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { OrgModule } from './org/org.module';
import { PeerModule } from './peer/peer.module';
import { OrdererModule } from './orderer/orderer.module';
import { ToastrModule } from 'ngx-toastr';
import { NetworkModule } from './network/network.module';
import { ChannelModule } from './channel/channel.module';

@NgModule({
  declarations: [
    AppComponent,
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
    PeerModule,
    OrdererModule,
    NetworkModule,
    ChannelModule,
    ToastrModule.forRoot()  

  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
