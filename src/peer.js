'use strict';

const Base = require('./base')

class Peer extends Base {
     /** 
    *@param {string} id 
    *@param {int} extPort 
    *@param {int} intPort 
    *@param {string} mspId 
    *@param {string} mspRoute
    *@param {string} tlsRoute
    *@param {string} extra
     **/

    constructor(id,domain,extPort, intPort,anchor = false, extra=''){
        super(extPort, intPort, extra);
        this.id=id;
        this.domain=domain;
        this.anchor= anchor;
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
        return this.anchor;
    }

    toJSON(){
        return  {
            PeerId: this.id,
            PeerAllId:this.id +'.'+this.domain,
            Domain: this.domain,
            ExtPort: this.extPort,
            IntPort: this.intPort,
            extra:this.extra
        }
    }

}
module.exports=Peer;