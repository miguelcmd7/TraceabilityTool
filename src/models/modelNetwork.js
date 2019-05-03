const Channel = require('../common/channel.js');
const Organization = require('../common/organization.js');
const Peer = require('../common/peer.js');
const PeerConf = require('../common/peerConf.js');
const Orderer = require('../common/orderer.js');
const Network = require('../common/network.js');
const build = require('../../lib/util/builder');
var fs = require('fs');
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
exports.build = function (){
    let net = Network.getInstance()
    if (net != null){
        build(net)
    }else{
        throw "Network not created!"
    }
}

exports.setDestDirectory= function(directory){
    console.log("El directorio es "+directory)
    if(!fs.existsSync(directory)){
        throw "Directory doesn't exists"    
        console.log("Directorio no existe")
    }
        
    else
         process.env.DEST_DIRECTORY= directory;
    return directory;
}

//this.createNetwork('myred','mired.com');
//module.exports=[createChannel,createNetwork,createOrderer,createOrg,createPeer]