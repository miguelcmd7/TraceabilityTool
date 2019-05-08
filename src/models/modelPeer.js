const Peer = require('../common/peer.js');
const PeerConf = require('../common/peerConf.js');
const Network = require('../common/network.js');
const ErrorWithCode = require('../../lib/error/error')
/**
 * @type {Network}
 */
var network = null;

function getInstance(){
    network = Network.getInstance()
    if (network==null)
        throw new ErrorWithCode(500,"Network not created");
}


exports.getAllPeers= function(){
    getInstance()
    let peers=[]
    for (let peer of network.gerPeers())
        peers.push(peer.toJSON())
    return {peers:peers}
}

exports.getPeer= function(peerId){
    getInstance()
    return network.getPeer(peerId).toJSON()
}
exports.createPeer =function (id,orgId,config) {
    getInstance() 
    let orgAllId = orgId +'.'+network.getDomain() 
    console.log(config);
    let peerConf = new PeerConf(config)
    let peer = new Peer(id,orgAllId,peerConf);
    return network.addPeer(peer,orgAllId).toJSON()
}

//updatePeer(peerId,peerConf,anchor)
exports.updatePeer = function(peerId, orgId ,config){
    getInstance()
    let peerConf = new PeerConf(config) 
    let orgAllId = orgId+'.'+network.getDomain()
    let peerAllId = peerId +'.'+orgAllId;
    return network.updatePeer(peerAllId,orgAllId,peerConf).toJSON()
    
}
exports.deletePeer = function(peerId,orgId){
    getInstance() 
    let orgAllId = orgId+'.'+network.getDomain()
    let peerAllId = peerId +'.'+orgAllId;  
    network.deletePeer(peerAllId,orgAllId);
    
}

