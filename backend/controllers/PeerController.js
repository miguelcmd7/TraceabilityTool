
const ModelPeer = require('../../src/models/modelPeer.js')
const Errors = require('../utils/errorManager');
//GET - Return all Homestates in the DB
exports.findAllPeersForOrg = function(req, res) {
    try {
        res.status(200).send(ModelPeer.getAllPeersForOrg(req.params.orgId))
    }catch(err){
        Errors.errorManager(res,err);
    }
};

//GET - Return a HomeState with specified ID
exports.findPeer = function(req, res) {
	try {
        res.status(200).send(ModelPeer.getPeer(req.params.peerId,req.params.orgId))
    }catch(err){
        Errors.errorManager(res,err);
    }
};

//POST - Insert a new HomeState in the DB
exports.createPeer = function(req, res) {
	try{

        res.status(200).send(ModelPeer.createPeer(req.body.id,req.body.orgId,req.body.config))
    }catch(err){
        Errors.errorManager(res,err);
    }

	
};
//TODOO
exports.updatePeer = function(req, res) {
	try{
        res.status(200).send(ModelPeer.updatePeer(req.params.peerId,req.params.orgId,req.body.config))
    }catch(err){
        Errors.errorManager(res,err);
    }

	
};

//TODOOO
exports.deletePeer = function(req, res) {
	try{
        res.status(200).send(ModelPeer.deletePeer(req.params.peerId,req.params.orgId))
    }catch(err){
        Errors.errorManager(res,err);
    }

	
};

