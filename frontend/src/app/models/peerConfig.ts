export class PeerConfig {
    intPort: number;
    extPort: number;
    anchor: boolean;
    extGossipPort : number;
    intGossipPort : number;

    constructor(extPort,intPort,anchor){
      this.extPort=extPort;
      this.intPort = intPort;
      this.anchor= anchor
    }

    toJSON(){
      return {
        extPort:this.extPort,
        intPort: this.intPort,
        anchor: this.anchor
      }
    }
  }