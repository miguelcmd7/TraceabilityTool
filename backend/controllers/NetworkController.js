const ModelNetwork = require('../../src/models/modelNetwork.js')
const ModelChaincode = require('../../src/chaincode/modelChaincodeTemp.js');
const Errors = require('../utils/errorManager');
//GET - Return all Homestates in the DB
exports.createNetwork = function(req, res) {
    try {
        if (req.body.name=='' || req.body.name ==null ||req.body.directory ==null || req.body.directory==''||req.body.domain ==null|| req.body.domain ==''){
            console.log('Bad request');
            res.status(404).send("Domain, Name and directory required")
        }else{
            console.log("Creating...")
            let json = ModelNetwork.createNetwork(req.body.name,req.body.domain)
            //ModelChaincode.createChaincodeCreator(req.body.name)
            ModelNetwork.setDestDirectory(req.body.directory);
            
            res.status(200).send(json)
            console.log("Network Created "+ json);
            
        }
    }catch(err){
        Errors.errorManager(res,err);
    }
};
exports.deleteNetwork = function(req, res) {
    try {
        console.log("Trying to delete network")
        if (ModelNetwork.deleteNetwork())
            res.status(200).send()
        else
            res.status(500).send("Error deleting network")
    }catch(err){
        Errors.errorManager(res,err);
    }
}
exports.getNetworkDomain= function(req, res) {
    try {

        res.status(200).send(ModelNetwork.getDomain())
        console.log("Getting domain")
    }catch(err){
        Errors.errorManager(res,err);
    }
};

//GET - Return a HomeState with specified ID
exports.build =  function(req, res) {
	try {
        console.log('Build call')
        let state = ModelNetwork.buildState()
        if (state.error== true ||state.code == 0 ||state.code == 3 ){
            ModelNetwork.build()
            console.log("No build state:")
            res.status(200).send(ModelNetwork.buildState())
        }else{
            console.log("Sending build state:")
            res.status(200).send(state)
        }
            
        
    }catch(err){
        Errors.errorManager(res,err);
    }
};
exports.launch = function(req, res) {
	try {
        console.log('Launch call')
        let state = ModelNetwork.buildState()
        if (state.error == false && state.code ==3  ){
            ModelNetwork.launch()
            console.log("No build state:")
            res.status(200).send()
        }else{
            console.log("Sending build state:")
            res.status(200).send(state)
        }
            
        
    }catch(err){
        Errors.errorManager(res,err);
    }
};

//POST - Insert a new HomeState in the DB
exports.setDestDirectory = function(req, res) {
    
    try{
        console.log("Setting directory...")
        res.status(200).send(ModelNetwork.setDestDirectory(req.body.directory))
    }catch(err){
        Errors.errorManager(res,err);
    }
};
exports.isInstanciated = function(req, res) {
    
    try{
        res.status(200).send(ModelNetwork.isInstanciated())
    }catch(err){
        Errors.errorManager(res,err);
    }
};

