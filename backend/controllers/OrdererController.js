
const ModelOrderer = require('../../src/models/modelOrderer.js')
const ErrorWithCode = require('../../lib/error/error')
const Errors = require('../utils/errorManager');
//GET - Return all Orderers in the network
exports.findAllOrderers = function(req, res) {
    try {
        res.status(200).send(ModelOrderer.getAllOrderers())
    }catch(err){
        Errors.errorManager(res,err);
    }
};

//GET - Return a Orderer with specified ID
exports.findOrderer = function(req, res) {
	try {
        res.status(200).send(ModelOrderer.getOrderer(req.params.ordererId))
    }catch(err){
        Errors.errorManager(res,err);
    }
};

//POST - Insert a new Orderer in the Network
exports.createOrderer = function(req, res) {
	try{
        //|| typeof req.body.extPort !== 'number'
        if (req.body.name ==null ||req.body.name=='' || req.body.id== null ||req.body.id== ''|| req.body.extPort==null ){
            console.log(req.body.name +" "+  req.body.id +" "+ req.body.extPort)
            throw new ErrorWithCode(400,"Name, Identification and ExtPort required")
        }else{
            res.status(200).send(ModelOrderer.createOrderer(req.body.name,req.body.id,req.body.extPort,req.body.intPort,req.body.extra))
        }
    }catch(err){
        Errors.errorManager(res,err);
    }

	
};
//TODOO
exports.updateOrderer = function(req, res) {
	try{
        //console.log ("Updatiing Orderer "+req.params.ordererId+"with "+req.body.name+" "+req.body.intPort+" "+req.body.extPort+" "+req.body.extra)
        let orderJSON= ModelOrderer.updateOrderer(req.params.ordererId,req.body.name,req.body.extPort,req.body.intPort,req.body.extra)
        //console.log(orderJSON)
        res.status(200).send(orderJSON)
    }catch(err){
        Errors.errorManager(res,err);
    }

	
};

//TODOOO
exports.deleteOrderer = function(req, res) {
	try{
        res.status(200).send(ModelOrderer.deleteOrderer(req.params.ordererId))
    }catch(err){
        Errors.errorManager(res,err);
    }

	
};