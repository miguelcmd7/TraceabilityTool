import { Injectable } from '@angular/core';
import { PeerSimple } from '../models/peerSimple';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Peer } from '../models/peer';

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  private peers:PeerSimple[];
  private orgsUrl = 'http://localhost:8080/orgs';
  private peerUrl = 'http://localhost:8080/peers';
  private lastRequest:Subject<Map<string,PeerSimple[]>>;
  private peersByOrg:Map<string,PeerSimple[]>;

  constructor(private http: HttpClient) { 
    this.peers = null;
    this.lastRequest  =  new Subject();
    this.peersByOrg = new Map<string,PeerSimple[]>()
  }

  getPeers(){
    if (this.peers!=null)
      return new Promise<PeerSimple[]>((resolve)=>{
        resolve(this.peers)
      })
    else
        return this.http.get<any>(this.peerUrl,{}).toPromise().then((data)=>{
            this.peersByOrg.clear()
            data.orgs.forEach((org,index,array)=>{
              let peersSim:PeerSimple[]=[];
              org.peers.forEach((peer,indexp,arrayp)=>{
                  peersSim.push(new PeerSimple(peer.PeerId))
              })
              
              this.peersByOrg.set(org.orgId,peersSim)
            })
            this.lastRequest.next(this.peersByOrg)
            return this.peersByOrg;  
        },(err)=>{
          throw err;
        })
  }

  getPeersSubject(){
    return this.lastRequest;
    //return this.http.post(this.startInventoryUrl,{});

  }

  addPeer(peer, orgId){
    console.log(peer)
    return  this.http.post<any>(this.orgsUrl+'/'+orgId+'/peers',peer.toJSON()).toPromise().then((data)=>{
      let peersForOrg = this.peersByOrg.get(orgId)
      
      if(peersForOrg !=null) 
          peersForOrg.push(new PeerSimple(peer.id)) 
       else 
        peersForOrg=[new PeerSimple(peer.id)]
      this.peersByOrg.set(orgId,peersForOrg)
      console.log("Calling add peer")
      console.log(this.peersByOrg.get(orgId))
      this.lastRequest.next(this.peersByOrg);
      return data
    },
    (err)=>{
      console.log(err)
      this.lastRequest.error(err);
      throw err;
      //return err;
    })

    
  }
  updatePeer(peer){
    return  this.http.put<any>(this.peerUrl+"/"+peer.peerId,peer).toPromise().then((data)=>{
     return data;
    },
    (err)=>{
      console.log(err)
      this.lastRequest.error(err);
      return err;
    })

  }

  deletePeer(peer, orgId){
    return this.http.delete(this.orgsUrl+"/"+orgId+'/peers/'+peer.peerId).toPromise().then((data)=>{
      this.peersByOrg.set( orgId, this.peersByOrg.get(orgId).filter((value:any,index,array)=>{
            return value.peerId !=peer.peerId;
      }))
      this.lastRequest.next(this.peersByOrg)
      return data;
    })

  }

  deleteOrg(orgId){
    this.peersByOrg.delete(orgId);
    this.lastRequest.next(this.peersByOrg)
  }

  reset(){
    this.peersByOrg.clear()
    this.lastRequest.next(this.peersByOrg);
  }


}
