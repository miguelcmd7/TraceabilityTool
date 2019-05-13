
const ModelOrg = require('../../src/models/modelOrganization')
const ErrorWithCode = require('../../lib/error/error')
const Errors = require('../utils/errorManager');
//GET - Return all Homestates in the DB
exports.findAllOrgs = function(req, res) {
    try {
        
        res.status(200).send(ModelOrg.getAllOrgs())
        console.log("Getting All Orgs")
    }catch(err){
        Errors.errorManager(res,err);        
    }
};

//GET - Return a HomeState with specified ID
exports.findOrg = function(req, res) {
	try {
        res.status(200).send(ModelOrg.getOrg(req.params.orgId))
        console.log("Getting Org"+req.params.orgId)
    }catch(err){
        Errors.errorManager(res,err);
        
    }
};

exports.peersByOrg = function(req,res){
    try{
        console.log("Trying get peers by org");
        res.status(200).send(ModelOrg.getPeersByOrgs());
        console.log("Getting Peers by Orgs");
    }catch(err){
        Errors.errorManager(res,err);
    }
}

//POST - Insert a new HomeState in the DB
exports.createOrg = function(req, res) {
    try{
        if (req.body.name ==null ||req.body.name=='' || req.body.orgId== null ||req.body.orgId== ''|| req.body.ca_name==null || req.body.ca_name=='' ||req.body.mspId== null|| req.body.mspId== null){
            res.status(400).send("Name, orgId, caName, and mspId requires");
        
        }else{
            res.status(200).send(ModelOrg.createOrg(req.body.name,req.body.orgId,req.body.ca_name,req.body.mspId))
            console.log("Org Created")
        }
    }catch(err){
        Errors.errorManager(res,err);

    }

	
};

exports.updateOrg = function(req, res) {
	try{
        
        res.status(200).send(ModelOrg.updateOrg(req.params.orgId,req.body.name,req.body.ca_name,req.body.mspId))
        console.log("Updatign ORG"+ req.params.orgId)
    }catch(err){
        Errors.errorManager(res,err);
    }

	
};

exports.deleteOrg = function(req, res) {
	try{
        console.log("Deletinf  ORG"+ req.params.orgId)
        res.status(200).send(ModelOrg.deleteOrg(req.params.orgId))
    }catch(err){
        Errors.errorManager(res,err);
        //console.log("Error Deletinf  ORG"+ req.param.orgId)
    }

	
};