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
        return (this.mspRoute==null||this.mspRoute=='');
    }

    /**
     * @returns {boolean}
     */
    hasTLS(){
        return (this.tlsRoute==null||this.tlsRoute.Route=='');
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
    setExtra(extra){
        this.extra= extra;
    }
    setExtPort(extPort){
        this.extPort= extPort;
    }
    setIntPort(intPort){
        this.intPort = intPort;
    }

   
}
module.exports= Base;