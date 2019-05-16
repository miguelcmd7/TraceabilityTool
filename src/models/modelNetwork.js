const Channel = require('../common/channel.js');
const Organization = require('../common/organization.js');
const Peer = require('../common/peer.js');
const PeerConf = require('../common/peerConf.js');
const Orderer = require('../common/orderer.js');
const Network = require('../common/network.js');
const {build, launch} = require('../../lib/util/builder');
const installChaincode = require('../../lib/util/chaincodeInstaller');
const ErrorWithCode = require('../../lib/error/error')
var fs = require('fs');
var network = null;

exports.setOutPutDir= function(){


}

exports.getNetwork= function(){
    network = Network.getInstance()
    if (network!=null)
        return network.toJSON()
    else 
        throw "Network doesn't exist"
}

exports.getDomain = function(){
    network = Network.getInstance()
    if (network!=null)
         return {domain:network.getDomain()};
    else 
        throw "Network doesn't exist"
}

exports.createNetwork = function(name, domain) {
    network = Network.getInstance()
    if(network ==null){
        network = new Network(name,domain)
        return network.toJSON();
    }
    else 
        throw "A network exists"
    
    
}
exports.deleteNetwork = function(){
    
    return Network.deleteInstance()

}
        
exports.build = function (){
    let net = Network.getInstance()
    if (net != null){
        return build(net)
    }else{
        throw "Network not created!"
    }
}
exports.launch = function (){
    let net = Network.getInstance()
    if (net != null){
        return launch(net)
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


exports.installChaincode = function(orgid,channel){
    let chan = Network.getInstance().getChannel(channel)
    console.log('CANAAAAAAAAAAL'+chan)
    
   // installChaincode(orgid,Network.getInstance(),chan,'end2endnodesdk','example_cc','v0','golang', )

   installChaincode(orgid,Network.getInstance(),chan,'fabcar','fabcar-master','v1','golang',)


    
}

exports.isInstanciated= function(){
    return Network.getInstance()!=null?{isInstanciated: true,netName:Network.getInstance().getName()}:{isInstanciated:false};
}
//this.createNetwork('myred','mired.com');
//module.exports=[createChannel,createNetwork,createOrderer,createOrg,createPeer]