
const ModelPeer = require('../../src/models/modelPeer.js')
const ErrorWithCode = require('../../lib/error/error')
//GET - Return all Homestates in the DB
exports.findAllPeersForOrg = function(req, res) {
    try {
        res.status(200).send(ModelPeer.getAllPeersForOrg(req.params.orgId))
    }catch(err){
        console.log(err)
        if (err instanceof ErrorWithCode &&err.error_message!=null)     
            res.status(err.cod).send(err.error_message);
        else 
            res.status(500).send(err);
    }
};

//GET - Return a HomeState with specified ID
exports.findPeer = function(req, res) {
	try {
        res.status(200).send(ModelPeer.getPeer(req.params.peerId,req.params.orgId))
    }catch(err){
        console.log(err)
        if (err instanceof ErrorWithCode &&err.error_message!=null)     
            res.status(err.cod).send(err.error_message);
        else 
            res.status(500).send(err);
    }
};

//POST - Insert a new HomeState in the DB
exports.createPeer = function(req, res) {
	try{

        res.status(200).send(ModelPeer.createPeer(req.body.id,req.body.orgId,req.body.config))
    }catch(err){
        console.log(err)
        if (err instanceof ErrorWithCode &&err.error_message!=null)     
            res.status(err.cod).send(err.error_message);
        else 
            res.status(500).send(err);
    }

	
};
//TODOO
exports.updatePeer = function(req, res) {
	try{
        res.status(200).send(ModelPeer.updatePeer(req.params.peerId,req.params.orgId,req.body.config))
    }catch(err){
        console.log(err)
        if (err instanceof ErrorWithCode &&err.error_message!=null)     
            res.status(err.cod).send(err.error_message);
        else 
            res.status(500).send(err);
    }

	
};

//TODOOO
exports.deletePeer = function(req, res) {
	try{
        res.status(200).send(ModelPeer.deletePeer(req.params.peerId,req.params.orgId))
    }catch(err){
        console.log(err)
        if (err instanceof ErrorWithCode &&err.error_message!=null)     
            res.status(err.cod).send(err.error_message);
        else 
            res.status(500).send(err);
    }

	
};

