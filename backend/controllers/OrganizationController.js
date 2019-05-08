
const ModelOrg = require('../../src/models/modelOrganization')
const ErrorWithCode = require('../../lib/error/error')
//GET - Return all Homestates in the DB
exports.findAllOrgs = function(req, res) {
    try {
        
        res.status(200).send(ModelOrg.getAllOrgs())
        console.log("Getting All Orgs")
    }catch(err){
        console.log("Error Getting All Orgs")
        console.log(err)
        res.status(500).send(err);
        
    }
};

//GET - Return a HomeState with specified ID
exports.findOrg = function(req, res) {
	try {
        res.status(200).send(ModelOrg.getOrg(req.params.orgId))
        console.log("Getting Org"+req.params.orgId)
    }catch(err){
        
        console.log(err)
        if (err instanceof ErrorWithCode &&err.error_message!=null){
            
            res.status(err.cod).send(err.error_message);
    
        }else 
            res.status(500).send(err);
        
    }
};

exports.peersByOrg = function(req,res){
    try{
        
        res.status(200).send(ModelOrg.getPeersByOrgs());
        console.log("Getting Peers by Orgs");
    }catch(err){
        console.log(err);
        res.status(500).send(err);
        console.log("Error Peers by Orgs");
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
        console.log(err);
        res.status(500).send(err);

    }

	
};
//TODOO
exports.updateOrg = function(req, res) {
	try{
        
        res.status(200).send(ModelOrg.updateOrg(req.body.name,req.body.orgId,req.body.domain,req.body.config))
        console.log("Updatign ORG"+ req.body.orgId)
    }catch(err){
        res.status(500).send(err);
        console.log("Error Updatign ORG"+ req.body.orgId)
    }

	
};

//TODOOO
exports.deleteOrg = function(req, res) {
	try{
        console.log("Deletinf  ORG"+ req.param.orgId)
        res.status(200).send(ModelOrg.deleteOrg(req.param.orgIds))
    }catch(err){
        res.status(500).send(err);
        console.log("Error Deletinf  ORG"+ req.param.orgId)
    }

	
};