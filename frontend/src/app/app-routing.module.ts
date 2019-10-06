import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrgComponent } from './org/create-org/create-org.component';
import { CreatePeerComponent } from './peer/create-peer/create-peer.component';
import { CreateOrdererComponent } from './orderer/create-orderer/create-orderer.component';
import { CreateNetworkComponent } from './network/create-network/create-network.component';
import { CreateChannelComponent } from './channel/create-channel/create-channel.component';
import { CreateChaincodeComponent } from './chaincode/create-chaincode/create-chaincode.component';

const routes: Routes = [
  { path: '', redirectTo: '/newNetwork', pathMatch: 'full' },
  { path: 'addPeer', component: CreatePeerComponent },
  { path: 'addChannel', component: CreateChannelComponent  },
  { path: 'addOrderer', component: CreateOrdererComponent },
  { path: 'addOrg', component: CreateOrgComponent },
  { path: 'org/:id', component: CreateOrgComponent },
  { path: 'orderers/:ordererId', component: CreateOrdererComponent },
  { path: 'orgs/:orgId/peers/:peerId', component: CreatePeerComponent  },
  { path: 'chaincodes', component: CreateChaincodeComponent },
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
