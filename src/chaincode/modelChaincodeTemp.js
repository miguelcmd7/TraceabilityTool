const Function = require('./function')
const Asset = require('./asset')
const Chaincode = require('./chaincode')
const chaincodeGen = require('../../lib/generator/chaincodeGen');
const fs = require('fs');
const ChaincodeCreator = require('./chaincodeCreator')
/**
 * @type {ChaincodeCreator} 
 */
var chaincodeCreator = null;

function getInstance(){
    chaincodeCreator = ChaincodeCreator.getInstance()
    if (chaincodeCreator==null)
        throw new ErrorWithCode(500,"ChaincodeCreator not created");
}


exports.createChaincodeTemp= function(chaincodeName,assetName,atributes, funcs){
    getInstance()
    let functions = []
    //Creates a function object for each function param
    funcs.forEach(element => {
        functions.push(new Function(element.name, element.args))
        
    });
     
    let asset = new Asset(assetName, atributes)

    
    let chaincode = new Chaincode(chaincodeName,asset,functions)
    return chaincodeCreator.addChaincode(chaincode)

}

exports.getChaincodes= function(){
    getInstance()
    let ccs = chaincodeCreator.getChaincodes()
    let chaincodes = []
    //Creates a function object for each function param
    ccs.forEach(element => {
        chaincodes.push(element.toJSON())
        
    });
  
    return chaincodes
}
exports.getChaincode= function(chaincodeName){
    getInstance()
    let cc =  chaincodeCreator.getChaincode(chaincodeName)
    
  
    return cc
}
exports.createChaincodeCreator = function(name){
    chaincodeCreator =ChaincodeCreator.getInstance()
 
    if(chaincodeCreator ==null){
        chaincodeCreator = new ChaincodeCreator(name)
        
    }
    else 
        throw "A network exists"

}