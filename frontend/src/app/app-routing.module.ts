import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPeerComponent } from './add-peer/add-peer.component';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { AddOrdererComponent } from './add-orderer/add-orderer.component';
import { AddOrgComponent } from './add-org/add-org.component';
import { PeerDetailComponent } from './peer-detail/peer-detail.component';
import { OrdererDetailComponent } from './orderer-detail/orderer-detail.component';
import { ChannelDetailComponent } from './channel-detail/channel-detail.component';
import { OrgDetailComponent } from './org-detail/org-detail.component';
import { NewNetworkComponent } from './new-network/new-network.component';
import { CreateOrgComponent } from './org/create-org/create-org.component';
import { CreatePeerComponent } from './peer/create-peer/create-peer.component';

const routes: Routes = [
  { path: '', redirectTo: '/newNetwork', pathMatch: 'full' },
  { path: 'addPeer', component: CreatePeerComponent },
  { path: 'addChannel', component: AddChannelComponent },
  { path: 'addOrderer', component: AddOrdererComponent },
  { path: 'addOrg', component: CreateOrgComponent },
  { path: 'assd', component: PeerDetailComponent },
  { path: 'retire-element', component: OrdererDetailComponent },
  { path: 'retire-element', component: ChannelDetailComponent },
  { path: 'retire-element', component: OrgDetailComponent },
  { path: 'newNetwork', component: NewNetworkComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
