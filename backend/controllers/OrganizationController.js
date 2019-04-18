
const ModelOrg = require('../../src/models/modelOrganization')
//GET - Return all Homestates in the DB
exports.findAllOrgs = function(req, res) {
    try {
        res.status(200).send(ModelOrg.getAllOrgs())
    }catch(err){
        res.status(500).send(err);
    }
};

//GET - Return a HomeState with specified ID
exports.findOrg = function(req, res) {
	try {
        res.status(200).send(ModelOrg.getOrg(req.params.orgId))
    }catch(err){
        res.status(500).send(err);
    }
};

exports.peersByOrg = function(req,res){
    try{
        res.status(200).send(ModelOrg.getPeersByOrgs());
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

//POST - Insert a new HomeState in the DB
exports.createOrg = function(req, res) {
    try{
        console.log("Trying to create Org")   

        res.status(200).send(ModelOrg.createOrg(req.body.name,req.body.orgId,req.body.ca_name,req.body.mspId,req.body.domain))
        console.log("Org Created")
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }

	
};
//TODOO
exports.updateOrg = function(req, res) {
	try{
        res.status(200).send(ModelOrg.updateOrg(req.body.name,req.body.orgId,req.body.domain,req.body.config))
    }catch(err){
        res.status(500).send(err);
    }

	
};

//TODOOO
exports.deleteOrg = function(req, res) {
	try{
        res.status(200).send(ModelOrg.createPeer(req.param.orgIds))
    }catch(err){
        res.status(500).send(err);
    }

	
};