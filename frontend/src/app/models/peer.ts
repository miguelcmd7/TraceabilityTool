import { PeerConfig } from './peerConfig';


export class Peer {
    
    id: String;
    orgId: String;
    config : PeerConfig;

    constructor({orgId,intPort,extPort,id,anchor}){
      this.id = id;
      this.orgId=orgId;
      this.config= new PeerConfig(extPort,intPort,anchor)
    }

    toJSON(){
      return {
        id:this.id,
        orgId:this.orgId,
        config:this.config.toJSON()
      }
    }
  }