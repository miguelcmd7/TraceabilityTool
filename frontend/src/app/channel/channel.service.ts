import { Injectable } from '@angular/core';
import { PeerSimple } from '../models/peerSimple';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  

  
  private channelUrl = 'http://localhost:8080/channels';
  private lastRequest:Subject<string[]>;
  private peers =[]
  private orderers = []
  private channelsNames:string[]; //Cache tu store the names of channels 
  constructor(private http: HttpClient) { 
    this.peers = null;
    this.lastRequest  =  new Subject();
    this.channelsNames = []
  }

  getChannels(){
    if (this.channelsNames.length>0)
      return new Promise<string[]>((resolve)=>{
        resolve(this.channelsNames)
      })
    else
        return this.http.get<any>(this.channelUrl,{}).toPromise().then((data)=>{
            this.channelsNames= []
            console.log(data);
            for(let channel of data.channels)
            
              this.channelsNames.push(channel.name)
            
              
             
            this.lastRequest.next(this.channelsNames)
            console.log('Channels :')
            console.log(this.channelsNames)
            return this.channelsNames;  
        },(err)=>{
          throw err;
        })
  }

  getChannelSubject(){
    return this.lastRequest;
    //return this.http.post(this.startInventoryUrl,{});

  }
  
  getChannel(channelName:string) {
    return this.http.get<any>(this.channelUrl+'/'+channelName).toPromise().then((data)=> {return data},(err)=>{throw err})
  }

  formToBodyRequest(form){
    let orgsPeer = []; 
    let success = false
     for( let key in form ){
        let tmp= {}
        if (key.includes('peer')){
          let [orgId, peerId] = form[key].split(' ');
          console.log(orgId)
          console.log(peerId)
          success = false
          for (let element of orgsPeer )
            if (element.orgId == orgId){
              element.peers.push(peerId)
              success = true
            } 
          if(!success)
            orgsPeer.push({orgId:orgId,peers:[peerId]})
        }
  
     }
     console.log(orgsPeer);
     return {

        name: form.name,
        consortium:form.consortium,
        orgs: orgsPeer,
        orderers : [form.orderer]

     }
  }

  addChannel(form){
    let bodyRequest = this.formToBodyRequest(form)
     return  this.http.post<any>(this.channelUrl+'/',bodyRequest).toPromise().then((data)=>{
     
      this.channelsNames.push(data.name)
      this.lastRequest.next(this.channelsNames);
      return data
    },
    (err)=>{
      console.log(err)
      this.lastRequest.error(err);
      throw err;
      //return err;
    })
  }
  
  updateChannel(channelName,form){
    let bodyRequest = this.formToBodyRequest(form)

    return  this.http.put<any>(this.channelUrl+"/"+channelName,bodyRequest).toPromise().then((data)=>{
     return data;
    },
    (err)=>{
      console.log(err)
      this.lastRequest.error(err);
      return err;
    })

  }

  deleteChannel(ChannelName){
    return this.http.delete(this.channelUrl+"/"+ChannelName).toPromise().then((data)=>{
      this.channelsNames = this.channelsNames.filter((value:any,index,array)=>{
            return value !=ChannelName;
      })
      return data;
    })

  }
  reset(){
    this.orderers=[]
    this.lastRequest.next(this.orderers);
  }



}
