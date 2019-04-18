
const ModelOrderer = require('../../src/models/modelOrderer.js')
//GET - Return all Homestates in the DB
exports.findAllOrderers = function(req, res) {
    try {
        res.status(200).send(ModelOrderer.getAllOrderers())
    }catch(err){
        res.status(500).send(err);
    }
};

//GET - Return a HomeState with specified ID
exports.findOrderer = function(req, res) {
	try {
        res.status(200).send(ModelOrderer.getOrderer(req.params.ordererId))
    }catch(err){
        res.status(500).send(err);
    }
};

//POST - Insert a new HomeState in the DB
exports.createOrderer = function(req, res) {
	try{
        res.status(200).send(ModelOrderer.createOrderer(req.body.name,req.body.id,req.body.domain,req.body.extPort,req.body.extPort,req.body.intPort,req.body.extra))
    }catch(err){
        res.status(500).send(err);
    }

	
};
//TODOO
exports.updateOrderer = function(req, res) {
	try{
       
        res.status(200).send(ModelOrderer.createOrderer(req.param.ordererId,req.body.name,req.body.intPort,req.body.extPort,req.body.extra))
    }catch(err){
        res.status(500).send(err);
    }

	
};

//TODOOO
exports.deleteOrderer = function(req, res) {
	try{
        res.status(200).send(ModelOrderer.createOrderer(req.param.ordererId))
    }catch(err){
        res.status(500).send(err);
    }

	
};