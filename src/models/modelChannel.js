const Channel = require('../common/channel.js');
const Organization = require('../common/organization.js');
const Peer = require('../common/peer.js');
const PeerConf = require('../common/peerConf.js');
const Orderer = require('../common/orderer.js');
const Network = require('../common/network.js');
const ErrorWithCode = require('../../lib/error/error')
var network = null;

function getInstance(){
    network = Network.getInstance()
    if (network==null)
        throw "Network not created"
}


exports.createChannel= function (name,consortium,orgs=[],peers=[],orderers=[]){
    if(network == null)
        getInstance();
    
    channel  = new Channel(name,consortium,orgs,peers,orderers);
    if (network !=null){
        network.addChannel(channel);
        return channel
    }else   
        throw "Network not created"

}

exports.updateChannel = function(){

    
}
exports.deleteChannel = function(){

    
}