
const ModelPeer = require('../../src/models/modelPeer.js')
//GET - Return all Homestates in the DB
exports.findAllPeers = function(req, res) {
    try {
        res.status(200).send(ModelPeer.getAllPeers())
    }catch(err){
        res.status(500).send(err);
    }
};

//GET - Return a HomeState with specified ID
exports.findPeer = function(req, res) {
	try {
        res.status(200).send(ModelPeer.getPeer(req.params.orgId,req.params.peerId))
    }catch(err){
        res.status(500).send(err);
    }
};

//POST - Insert a new HomeState in the DB
exports.createPeer = function(req, res) {
	try{
        res.status(200).send(ModelPeer.createPeer(req.body.id,req.body.orgId,req.body.domain,req.body.config))
    }catch(err){
        res.status(500).send(err);
    }

	
};
//TODOO
exports.updatePeer = function(req, res) {
	try{
        res.status(200).send(ModelPeer.createPeer(req.body.id,req.body-orgId,req.body.domain,req.body.config))
    }catch(err){
        res.status(500).send(err);
    }

	
};

//TODOOO
exports.deletePeer = function(req, res) {
	try{
        res.status(200).send(ModelPeer.createPeer(req.body.id,req.body-orgId,req.body.domain,req.body.config))
    }catch(err){
        res.status(500).send(err);
    }

	
};
