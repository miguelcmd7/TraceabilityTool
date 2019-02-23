'use strict';

//var read = require('read-yaml');

class Base {
     /** 

    *@param {int} extPort 
    *@param {int} intPort 
    *@param {string} extra
     **/

    constructor(extPort, intPort,extra){
        this.extPort=extPort;
        this.intPort=intPort;
        this.extra=extra
    }

    /**
     * @returns {boolean}
     */
    hasMSP(){
        retrun (this.mspRoute==null||this.mspRoute=='');
    }

    /**
     * @returns {boolean}
     */
    hasTLS(){
        retrun (this.tlsRoute==null||this.tlsRoute.Route=='');
    }
    
    getExtPort(){
        return this.extPort;  
    }
    getIntPort(){
        return this.intPort;  
    }
    getExtra(){
        return this.extra;  
    }

   
}
module.exports= Base;