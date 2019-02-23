'use strict';
var read = require('read-yaml');
const Base = require('./base');

class Orderer extends Base {
     /** 
    *@param {string} name
    *@param {int} extPort 
    *@param {int} intPort 
    *@param {string} extra
    */

    constructor(name,id,extPort, intPort, extra=''){
        super(extPort, intPort, extra);
        this.name=name;
        this.id=id;
    }

    getId(){
        return this.id
    }
    getName(){
        return this.name;
    }
    
    toJSON(){
        return  {
            ordererId: this.name,
            ExtPort: this.extPort,
            IntPort: this.intPort,
            extra:this.extra
        }
    }

}
module.exports=Orderer;