
const ModelChannel = require('../../src/models/modelChannel.js')
const Errors = require('../utils/errorManager');
//GET - Return all Homestates in the DB
exports.findAllChannels = function(req, res) {
    try {
        res.status(200).send(ModelChannel.getAllChannels())
    }catch(err){
        Errors.errorManager(res,err);
    }
};

//GET - Return a HomeState with specified ID
exports.findChannel = function(req, res) {
	try {
        res.status(200).send(ModelChannel.getChannel(req.params.channelId))
    }catch(err){
        Errors.errorManager(res,err);
    }
};

//POST - Insert a new HomeState in the DB
exports.createChannel = function(req, res) {
	try{

        if (req.body.name !=null && req.body.consortium != null){
            let peerbyorgs= new Map();
            for (let org of req.body.orgs){
                if (org.peers != null) 
                    peerbyorgs.set(org.orgId,org.peers )
                else 
                    peerbyorgs.set(org.orgId,[] )
            }
            let orderers = req.body.orderers? req.body.orderers:[]
            res.status(200).send(ModelChannel.createChannel(req.body.name,req.body.consortium,orderers,peerbyorgs))
        }
        else
            res.status(403).send("Debe temner nombre y cosortium");

        
    }catch(err){
        Errors.errorManager(res,err);
    }

	
};


exports.updateChannel = function(req, res) {
	try{

        if (req.body.name !=null && req.body.consortium != null){
            let peerbyorgs= new Map();
            for (let org of req.body.orgs){
                if (org.peers != null) 
                    peerbyorgs.set(org.orgId,org.peers )
                else 
                    peerbyorgs.set(org.orgId,[] )
            }
            let orderers = req.body.orderers? req.body.orderers:[]
            res.status(200).send(ModelChannel.updateChannel(req.params.channelId,req.body.consortium,orderers,peerbyorgs))
        }
        else
            res.status(403).send("Debe temner nombre y cosortium");
    }catch(err){
        Errors.errorManager(res,err);
    }

	
};
//TODO
exports.deleteChannel = function(req, res) {
	try{

        res.status(200).send(ModelChannel.deleteChannel(req.params.channelId))
    }catch(err){
        Errors.errorManager(res,err);
    }

	
};


