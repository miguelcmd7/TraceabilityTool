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

exports.createNetwork = function(name, domain) {
    if (network == null)
        network = new Network(name,domain)
    
    
}




exports.createPeer =function (id,orgId,domain,config) {
    peer = new Peer(id,domain,config);
    if (network !=null){
        network.addPeer(peer,orgId);
        return peer.toJSON()
    }else   
        throw "Network not created"
}

//updatePeer(peerId,peerConf,anchor)
exports.updatePeer = function(peerId,peerConf){
    return network.updatePeer(peerId,peerConf).toJSON()
    
}
exports.deletePeer = function(peerId,orgId){
    network.dele
    
}

//constructor(name, id, domain, extPort, intPort, extra = '')
exports.createOrderer=function (name,id,domai,extPort,intPort,extra=''){

    orderer = new Orderer(name,id,domai,extPort,intPort,extra)
    if (network !=null){
        network.addOrderer(orderer);
        return orderer.toJSON()
    }else   
        throw "Network not created"

}

exports.updateOrderer = function(){

    
}
exports.deleteOrderer = function(){

    
}
// constructor(name,consortium,orgs=[],peers=[],orderers=[])
exports.createChannel= function (name,consortium,orgs=[],peers=[],orderers=[]){
    channel  = new Channel(name,consortium,orgs,peers,orderers);
    if (network !=null){
        network.addChannel(channel);
        return channel.toJSON()
    }else   
        throw "Network not created"

}

exports.updateChannel = function(){

    
}
exports.deleteChannel = function(){

    
}
//module.exports=[createChannel,createNetwork,createOrderer,createOrg,createPeer]