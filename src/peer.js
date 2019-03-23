'use strict';

const PeerConf = require('./peerConf')
class Peer  {
     /** 
    *@param {string} id 
    *@param {string} domain 
    *@param {PeerConf} config
     **/
    constructor(id,domain,config){
       
        this.id=id;
        this.domain=domain;
        this.config= config;
    }

    getId(){
        return this.id;
    }
    getDomain(){
        return this.domain;
    }
    getAllId(){
        return this.id +'.'+this.domain; 
    }
    
    isAnchor(){
        return this.config.anchor;
    }

    toJSON(){
        return  {
            PeerId: this.id,
            PeerAllId:this.id +'.'+this.domain,
            Domain: this.domain,
            ExtPort: this.config.extPort,
            IntPort: this.config.intPort,
            ExtGossipPort: this.config.extGossipPort,
            IntGossipPort: this.config.intGossipPort,
            isAnchor: this.config.anchor,
            extra:this.config.extra

        }
    }

}
module.exports=Peer;