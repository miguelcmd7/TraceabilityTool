'use strict';
const Base = require('../base');

class Orderer extends Base {
    /** 
     *@param {string} name
     *@param {int} extPort 
     *@param {int} intPort 
     *@param {string} extra
     */

    constructor(name, id, domain, extPort, intPort, extra = '') {
        super(extPort, intPort, extra);
        this.name = name;
        this.id = id;
        this.domain = domain;
    }

    getId() {
        return this.id
    }
    getName() {
        return this.name;
    }
    setName(name){
        this.name= name;
    }
    getDomain() {
        return this.domain;
    }
    getAllId() {
        return this.id + '.' + this.domain;
    }

    toJSON() {
        return {
            ordererName:this.name,
            ordererId: this.id,
            domain: this.domain,
            ExtPort: this.extPort,
            IntPort: this.intPort,
            extra: this.extra
        }
    }

}
module.exports = Orderer;
