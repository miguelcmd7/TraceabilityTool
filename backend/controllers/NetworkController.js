const ModelNetwork = require('../../src/models/modelNetwork.js')
//GET - Return all Homestates in the DB
exports.createNetwork = function(req, res) {
    try {
        res.status(200).send(ModelNetwork.createNetwork(req.body.name,req.body.domain))
    }catch(err){
        res.status(500).send(err);
    }
};

//GET - Return a HomeState with specified ID
exports.build = function(req, res) {
	try {
        res.status(200).send(ModelChannel.build())
    }catch(err){
        res.status(500).send(err);
    }
};

//POST - Insert a new HomeState in the DB
exports.setDestDirectory = function(req, res) {
	try{
        res.status(200).send(ModelChannel.createChannel(req.body.directory))
    }catch(err){
        res.status(500).send(err);
    }


};

