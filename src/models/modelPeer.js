const Peer = require('../common/peer.js');
const PeerConf = require('../common/peerConf.js');
const Network = require('../common/network.js');
var network = null;

function getInstance(){
    network = Network.getInstance()
    if (network==null)
        throw "Network not created"
}


exports.getAllPeers= function(){
    getInstance()
    let peers = network.gerPeers()
    let json= {};
    for (let peer of peers)
        Object.assign(json,peer.toJSON())
    return json
}

exports.getPeer= function(peerId){
    getInstance()
    return network.getPeer(peerId).toJSON()
}
exports.createPeer =function (id,orgId,domain,config) {
    getInstance()
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
    network.deletePeer(peerId,orgId);
    
}

