const ModelNetwork = require('../../src/models/modelNetwork.js')
//GET - Return all Homestates in the DB
exports.createNetwork = function(req, res) {
    try {
        if (req.body.name=='' || req.body.name ==null ||req.body.directory ==null || req.body.directory==''||req.body.domain ==null|| req.body.domain ==''){
            console.log('Bad request');
            res.status(404).send("Domain, Name and directory required")
        }else{
            console.log("Creating...")
            let json = ModelNetwork.createNetwork(req.body.name,req.body.domain)
            ModelNetwork.setDestDirectory(req.body.directory);
            
            res.status(200).send(json)
            console.log("Network Created "+ json);
            
        }
    }catch(err){
        res.status(500).send(err);
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
        console.log("Error deleting"+ err)
        res.status(500).send(err);
    }
}
exports.getNetworkDomain= function(req, res) {
    try {

        res.status(200).send(ModelNetwork.getDomain())
        console.log("Getting domain")
    }catch(err){
        console.log("Error Getting domain"+err)
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
        console.log("Setting directory...")
        res.status(200).send(ModelNetwork.setDestDirectory(req.body.directory))
    }catch(err){
        res.status(500).send(err);
    }


};

