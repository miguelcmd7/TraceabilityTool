'use strict';
const ErrorWithCode = require('../../lib/error/error')

//var read = require('read-yaml');

class Asset {
    /**
     * 
     * @param {string} name 
     * @param {object} atributes 
     */
    constructor(name, atributes) {
 

       if (name== null || name== ''){
           throw ErrorWithCode(400,'Assent name is required');
       }
        
        /**
         * @type {string} 
         */
        this.name = name
        
        if (atributes== null ){
            this.atributes = [];
        }else{
            this.atributes = atributes;
        }
        
        
        
        return this;
    }
    

    toJSON(){
        let copy = this.atributes;
        if (copy.length!= 0){
           copy[this.atributes.length-1]["last"] =true
        }
        return {
            assetName:this.name,
            atributes:copy
        }
    }

}
      
module.exports = Asset;