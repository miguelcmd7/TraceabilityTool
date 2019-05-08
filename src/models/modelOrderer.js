const Orderer = require('../common/orderer.js');
const Network = require('../common/network.js');
const ErrorWithCode = require('../../lib/error/error')
var network = null;


function getInstance(){
    network = Network.getInstance()
    if (network==null)
        throw "Network not created"
}


//constructor(name, id, domain, extPort, intPort, extra = '')
exports.createOrderer=function (name,id,domai,extPort,intPort,extra=''){
    getInstance();
    orderer = new Orderer(name,id,domai,extPort,intPort,extra)

    network.addOrderer(orderer);
    return orderer.toJSON()


}

exports.updateOrderer = function(ordererId, name, intPort,extPort,extra=''){
    
    getInstance();
    let orderer  = network.updateOrderer(ordererId, name, intPort,extPort,extra='');
    return orderer.toJSON()
}
exports.deleteOrderer = function(ordererId){
    network.deleteOrderer(ordererId);
    
}