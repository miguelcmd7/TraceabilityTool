const Orderer = require('../common/orderer.js');
const Network = require('../common/network.js');
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

exports.updateOrderer = function(){
    getInstance();
    
}
exports.deleteOrderer = function(){

    
}