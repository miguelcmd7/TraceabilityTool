const Chaincode = require('./chaincode')
const chaincodeGen = require('../../lib/generator/chaincodeGen');
const fs = require('fs');

class ChaincodeCreator {

        /** 
     *@param {string} name 
     * @returns {ChaincodeCreator}
     **/
    constructor(name) {
        if (!!ChaincodeCreator.instance) {
            return ChaincodeCreator.instance;
        }

        ChaincodeCreator.instance = this;
        
        /**
         * @type {Map<string,Chaincode>} 
         */
        this.chaincodes = new Map();


        return this
    }

     /**
     * @returns {ChaincodeCreator}
     */
    static getInstance(){
        if (!!ChaincodeCreator.instance) {
            return ChaincodeCreator.instance;
        }else
            return null
    }

    /**
     * 
     * @param {int} number 
     * @param {string} message 
     */
    createError(number, message){
        return new ErrorWithCode(number,message)
    }


    /**
     * 
     * @param {Chaincode} chaincode 
     */
    addChaincode(chaincode){
        if(this.chaincodes.get(chaincode.getName())== null){

            this.chaincodes.set(chaincode.getName(),chaincode)
            fs.writeFileSync('/home/miguel/go/src/chaincodeCreated/'+chaincodeName+'.go',chaincodeGen(chaincode));
            return chaincode.toJSON()

        }else{

            return this.createError(400,"Chaincode already exists")
        }



    }
        
}
module.exports = ChaincodeCreator;