const Channel = require('../common/channel.js');
const Organization = require('../common/organization.js');
const Peer = require('../common/peer.js');
const PeerConf = require('../common/peerConf.js');
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
        throw new ErrorWithCode(500,"Network not created");
}

function createChannel(name,consortium,orderers, peersByOrg){
    let allIdspeersByOrg = new Map()

    peersByOrg.forEach((values,key)=>{
        key = key+'.'+network.getDomain();
        let peersAllId =[]
        values.forEach((value)=>{
            peersAllId.push(value+'.'+key);
        })
        allIdspeersByOrg.set(key,peersAllId);
    })

    orderers = orderers.map((value)=>{
        return value+'.'+network.getDomain()
    })
    
    return new Channel(name,consortium,orderers,allIdspeersByOrg);
}

exports.createChannel= function (name,consortium,orderers=[], peersByOrg = new Map()){
    getInstance();
    let channel = createChannel(name,consortium,orderers, peersByOrg )
    network.addChannel(channel);
    return channel.toJSON()


}

exports.updateChannel = function(name,consortium,orderers=[], peersByOrg = new Map()){
    getInstance();
    let channel = createChannel(name,consortium,orderers, peersByOrg )
    network.updateChannel(channel);
    return channel.toJSON()
}


exports.deleteChannel = function(channelName){
    getInstance();
    return network.deleteChannel(channelName)
    
}
exports.getChannel = function(channelName){
    getInstance();
    return network.getChannel(channelName).toJSON();
    
}
exports.getAllChannels = function(){
    getInstance();
    let channels = []
    for (let channel of network.getChannels())
        channels.push(channel.toJSON())

    return {channels:channels}
    
}