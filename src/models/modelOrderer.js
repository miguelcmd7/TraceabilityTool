const Orderer = require('../common/orderer.js');
const Network = require('../common/network.js');
const ErrorWithCode = require('../../lib/error/error')

/**
 * @type {Network} 
 */
var network = null;


function getInstance(){
    network = Network.getInstance()
    if (network==null)
        throw "Network not created"
}

exports.getOrderer=function(orderId){
    getInstance();
    return network.getOrderer(orderId+'.'+network.getDomain()).toJSON()

}

exports.getAllOrderers=function(){
    getInstance();
    let orderes = []
    for (let order of network.getOrderers())
        orderes.push(order.toJSON())

    return {orderers:orderes} 
}

//constructor(name, id, domain, extPort, intPort, extra = '')
exports.createOrderer=function (name,id,extPort,intPort=7051,extra=''){
    getInstance();

    orderer = new Orderer(name,id,network.getDomain(),extPort,intPort,extra)

    network.addOrderer(orderer);
    return orderer.toJSON()


}

exports.updateOrderer = function(ordererId, name, extPort,intPort,extra){
    
    getInstance();
    let orderer  = network.updateOrderer(ordererId+'.'+network.getDomain(), name, intPort,extPort,extra);
    return orderer.toJSON()
}

exports.deleteOrderer = function(ordererId){
    network.deleteOrderer(ordererId+'.'+network.getDomain());
    
}