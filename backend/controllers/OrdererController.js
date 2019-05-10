
const ModelOrderer = require('../../src/models/modelOrderer.js')
const ErrorWithCode = require('../../lib/error/error')
//GET - Return all Homestates in the DB
exports.findAllOrderers = function(req, res) {
    try {
        res.status(200).send(ModelOrderer.getAllOrderers())
    }catch(err){
        console.log(err)
        if (err instanceof ErrorWithCode &&err.error_message!=null)     
            res.status(err.cod).send(err.error_message);
        else 
            res.status(500).send(err);
    }
};

//GET - Return a HomeState with specified ID
exports.findOrderer = function(req, res) {
	try {
        res.status(200).send(ModelOrderer.getOrderer(req.params.ordererId))
    }catch(err){
        console.log(err)
        if (err instanceof ErrorWithCode &&err.error_message!=null)     
            res.status(err.cod).send(err.error_message);
        else 
            res.status(500).send(err);
    }
};

//POST - Insert a new HomeState in the DB
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
        console.log(err)
        if (err instanceof ErrorWithCode &&err.error_message!=null)     
            res.status(err.cod).send(err.error_message);
        else 
            res.status(500).send(err);
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
        console.log(err)
        if (err instanceof ErrorWithCode &&err.error_message!=null)     
            res.status(err.cod).send(err.error_message);
        else 
            res.status(500).send(err);
    }

	
};

//TODOOO
exports.deleteOrderer = function(req, res) {
	try{
        res.status(200).send(ModelOrderer.deleteOrderer(req.params.ordererId))
    }catch(err){
        console.log(err)
        if (err instanceof ErrorWithCode &&err.error_message!=null)     
            res.status(err.cod).send(err.error_message);
        else 
            res.status(500).send(err);
    }

	
};