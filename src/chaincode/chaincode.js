const Function = require('./function')
const Asset = require('./asset')
const ErrorWithCode = require('../../lib/error/error')

class Chaincode {
    /**
     * 
     * @param {string} name 
     * @param {Asset} asset
     * @param {Function[]} functions 
     * 
     */
    constructor(name, asset,functions=[]) {
 

       if (name== null || name== ''){
           throw ErrorWithCode(400,'Chaincode name is required');
       }
        
        /**
         * @type {string} 
         */
        this.name = name
        
       this.asset= asset;
       this.functions =functions;
    }

    getName(){
        return this.name;
    }

    getAsset(){
        return this.asset;
    }
    getFunctions(){
        return this.functions;
    }

    /**
     * 
     * @param {Function[]} func 
     */
    setFunctions(func){
        this.functions = func;
    }

    toJSON(){
        let funcsJSON = []
        this.functions.forEach((value,index,array)=>{
            let json = value.toJSON();
            if (index ==0)
                json["first"] = true;
            funcsJSON.push(json);
        })
        return{
            funcs : funcsJSON,
            assets:[this.asset.toJSON()]
        }
    }
}

module.exports = Chaincode;