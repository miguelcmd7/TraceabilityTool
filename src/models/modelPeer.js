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


exports.getAllPeersForOrg= function(orgId){
    getInstance()
    let peers=[]
    for (let peer of network.getAllPeersForOrg(orgId+'.'+network.getDomain()))
        peers.push(peer.toJSON())
    return {peers:peers}
}

exports.getPeer= function(peerId,orgId){
    getInstance()
    let peer = network.getPeer(peerId+'.'+orgId+'.'+network.getDomain())
    if (peer == null)
        throw new ErrorWithCode(404, "Peer "+peerId+" or Org "+orgId+" not found")
    else
        return peer.toJSON()
}
exports.createPeer =function (id,orgId,config) {
    getInstance() 
    let orgAllId = orgId +'.'+network.getDomain() 
    //console.log(config);
    let peerConf = new PeerConf(config)
    let peer = new Peer(id,orgAllId,peerConf);
    return network.addPeer(peer,orgAllId).toJSON()
}

//updatePeer(peerId,peerConf,anchor)
exports.updatePeer = function(peerId, orgId ,config){
    getInstance()
    console.log(config)
    let peerConf = new PeerConf(config) 
    let orgAllId = orgId+'.'+network.getDomain()
    let peerAllId = peerId +'.'+orgAllId;
    return network.updatePeer(peerAllId,peerConf).toJSON()
    
}
exports.deletePeer = function(peerId,orgId){
    getInstance() 
    let orgAllId = orgId+'.'+network.getDomain()
    let peerAllId = peerId +'.'+orgAllId;  
    network.deletePeer(peerAllId,orgAllId);
    
}

