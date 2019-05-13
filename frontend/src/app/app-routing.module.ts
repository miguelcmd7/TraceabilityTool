import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrgComponent } from './org/create-org/create-org.component';
import { CreatePeerComponent } from './peer/create-peer/create-peer.component';
import { CreateOrdererComponent } from './orderer/create-orderer/create-orderer.component';
import { CreateNetworkComponent } from './network/create-network/create-network.component';

const routes: Routes = [
  { path: '', redirectTo: '/newNetwork', pathMatch: 'full' },
  { path: 'addPeer', component: CreatePeerComponent },
//  { path: 'addChannel', component:  },
  { path: 'addOrderer', component: CreateOrdererComponent },
  { path: 'addOrg', component: CreateOrgComponent },
  { path: 'org/:id', component: CreateOrgComponent },
 // { path: 'assd', component: PeerDetailComponent },
 // { path: 'retire-element', component: OrdererDetailComponent },
 // { path: 'retire-element', component: ChannelDetailComponent },
 // { path: 'retire-element', component: OrgDetailComponent },
  { path: 'newNetwork', component: CreateNetworkComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
