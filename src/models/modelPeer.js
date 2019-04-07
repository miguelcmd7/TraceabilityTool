const Peer = require('../common/peer.js');
const PeerConf = require('../common/peerConf.js');
const Network = require('../common/network.js');
var network = null;

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
    network.deletePeer(peerId,orgId)
    
}
