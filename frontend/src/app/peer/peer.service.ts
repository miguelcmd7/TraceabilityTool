import { Injectable } from '@angular/core';
import { PeerSimple } from '../models/peerSimple';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  private peers:PeerSimple[];
  private peerUrl = 'http://localhost:8080/peers';
  private lastRequest:Subject<PeerSimple[]>;

  constructor(private http: HttpClient) { 
    this.peers = null;
    this.lastRequest  =  new Subject();
  }

  getPeers(){
    if (this.peers!=null)
      return new Promise<PeerSimple[]>((resolve)=>{
        resolve(this.peers)
      })
    else
        return this.http.get<any>(this.peerUrl,{}).toPromise().then((data)=>{
            this.peers=[];
            data.peers.forEach((valie,index,array)=>{
              this.peers.push(new PeerSimple(valie.peerId))
            })
            this.lastRequest.next(this.peers)
            return this.peers;  
        },(err)=>{
          throw err;
        })
  }

  getPeersSubject(){
    return this.lastRequest;
    //return this.http.post(this.startInventoryUrl,{});

  }

  addPeer(peer){
    console.log(peer)
    return  this.http.post<any>(this.peerUrl,peer).toPromise().then((data)=>{
      if (this.peers ==null)
        this.peers = [new PeerSimple (data.peerId)]
      else 
        this.peers.push(new PeerSimple (data.peerId));
      this.lastRequest.next(this.peers);
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

  deletePeer(peerId){
    return this.http.delete(this.peerUrl+"/"+peerId).toPromise().then((data)=>{
      this.peers = this.peers.filter((value:any,index,array)=>{
            return value.peerId !=peerId;
      })
      return data;
    })

  }
}
