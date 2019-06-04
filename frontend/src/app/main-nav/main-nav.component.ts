import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { OrgService } from "src/app/org/org.service";
import { NetworkService } from "src/app/network/network.service";
import { OrgSimple } from "../models/orgSimple";
import { OrdererSimple } from "../models/ordererSimple";
import { OrdererService } from "../orderer/orderer.service";
import { Router, ActivatedRoute } from "@angular/router";
import { PeerService } from "../peer/peer.service";
import { PeerSimple } from "../models/peerSimple";
import { ChannelService } from '../channel/channel.service';

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.css"]
})
export class MainNavComponent implements OnInit {
  private orgs: OrgSimple[] = [];
  private orderers: OrdererSimple[] = [];
  private isInstanciated: boolean;
  private netName: string;
  private peersByOrg = [];
  private channels: string[] = [];
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private orgService: OrgService,
    private netService: NetworkService,
    private ordererService: OrdererService,
    private peerService: PeerService,
    private channelService:ChannelService,
    private _Activatedroute: ActivatedRoute
  ) {
    this.orgs = [];
    this.orderers = [];
    this.peersByOrg = null;
    this.channels = [];
    ///this.peersByOrg.keys
    //this.isInstanciated=true;
    //this.netName=null;
  }

  ngOnInit(): void {
    // this._Activatedroute.url.subscribe((data)=>{console.log(data)})
    // this.netService.isInstanciated().then((data)=>{
    //   this.isInstanciated= data.isInstanciated
    //   if (data.isInstanciated)
    //     this.netName = data.netName;
    // })
    this.orgService.getOrgsSubject().subscribe(
      data => {
        console.log(data);
        this.orgs = data;
      },
      err => {
        console.log("Error subscribing to Orgs" + err);
      }
    );

    this.orgService.getOrgs().catch(err => {
      console.log("Error getting org from main-nav" + err);
    });

    this.ordererService.getOrderersSubject().subscribe(
      data => {
        console.log(data);
        this.orderers = data;
      },
      err => {
        console.log("Error subscribing to Orderers" + err);
      }
    );

    this.ordererService.getOrderers().catch(err => {
      console.log("Error getting orderers from main-nav" + err);
    });
    this.peerService.getPeersSubject().subscribe(
      data => {
        console.log(data);
        let temp = [];
        data.forEach((peers, key, map) => {
          temp.push({ orgId: key, peers: peers });
        });
        this.peersByOrg = temp;
      },
      err => {
        console.log("Error subscribing to peers" + err);
      }
    );

    this.peerService.getPeers().catch(err => {
      console.log("Error getting peers from main-nav" + err);
    });
    this.channelService.getChannelSubject().subscribe(
      data => {
        console.log(data);
        this.channels = data;
      },
      err => {
        console.log("Error subscribing to Channels" + err);
      }
    );

    this.channelService.getChannels().catch(err => {
      console.log("Error getting channels from main-nav" + err);
    });
  }
}
