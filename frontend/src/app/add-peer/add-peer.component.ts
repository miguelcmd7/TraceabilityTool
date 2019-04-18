import { Component, OnInit } from '@angular/core';
import {PeerService} from '../peer-service';
import {OrgService} from '../org.service'

@Component({
  selector: 'app-add-peer',
  templateUrl: './add-peer.component.html',
  styleUrls: ['./add-peer.component.css']
})
export class AddPeerComponent implements OnInit {

  //private tags: Org[] ; 
  //constructor(private peerService: PeerService, private orgService:OrgService) { }
  constructor(){}
  ngOnInit() { 
    //orgs = this.orgService.getOrgIds()

  }

}
