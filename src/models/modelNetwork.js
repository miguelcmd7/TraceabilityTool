const Channel = require('../common/channel.js');
const Organization = require('../common/organization.js');
const Peer = require('../common/peer.js');
const PeerConf = require('../common/peerConf.js');
const Orderer = require('../common/orderer.js');
const Network = require('../common/network.js');
var network = null;

exports.setOutPutDir= function(){


}

exports.getNetwork= function(){
    return network.toJSON()

}
exports.getDomain = function(){
    return {domain:network.getDomain()};
}

exports.createNetwork = function(name, domain) {
    if (network == null)
        network = new Network(name,domain)
    if(network !=null)
        return network.toJSON();
    else 
        throw ("Error creando la red")
    
    
}
this.createNetwork('myred','mired.com');

//module.exports=[createChannel,createNetwork,createOrderer,createOrg,createPeer]