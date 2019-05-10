import { OrgSimple } from './orgSimple';
import { PeerSimple } from './peerSimple';

export class PeersByOrgSimple {
    
    map: Map<OrgSimple, PeerSimple>;
    

    constructor(){
      this.map =new Map<OrgSimple, PeerSimple>();
    }


  }