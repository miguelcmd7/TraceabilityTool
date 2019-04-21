
const ModelChannel = require('../../src/models/modelChannel.js')
//GET - Return all Homestates in the DB
exports.findAllChannels = function(req, res) {
    try {
        res.status(200).send(ModelChannel.getAllChannels())
    }catch(err){
        res.status(500).send(err);
    }
};

//GET - Return a HomeState with specified ID
exports.findChannel = function(req, res) {
	try {
        res.status(200).send(ModelChannel.getChannel(req.param.channelId))
    }catch(err){
        res.status(500).send(err);
    }
};

//POST - Insert a new HomeState in the DB
exports.createChannel = function(req, res) {
	try{

        if (req.body.name !=null && req.body.consortium != null){
            let orgs= req.body.orgs? req.body.orgs:[]
            let peers = req.body.peers? req.body.peers :[]
            let orderers = req.body.orderers? req.body.orderers:[]
            res.status(200).send(ModelChannel.createChannel(req.body.name,req.body.consortium,orgs,peers,orderers))
        }
        else
            res.status(403).send("Debe temner nombre y cosortium");

        
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }

	
};

//TODO
exports.updateChannel = function(req, res) {
	try{

        res.status(200).send(ModelChannel.createChannel(req.body.name,req.body.consortium,req.body.orgs,req.body.peers,req.body.orderers))
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }

	
};
//TODO
exports.deleteChannel = function(req, res) {
	try{

        res.status(200).send(ModelChannel.createChannel(req.body.name,req.body.consortium,req.body.orgs,req.body.peers,req.body.orderers))
    }catch(err){
        res.status(500).send(err);
    }

	
};

