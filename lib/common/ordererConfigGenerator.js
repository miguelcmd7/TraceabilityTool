function createOrdererConfig(orderer,peers=[]){

    
    var config = {volumes:[{internal:"./crypto-config/ordererOrganizations/"+orderer.getDomain()+"/orderers/"+orderer.getAllId()+"/",
                       external:"/etc/hyperledger/msp/orderer"},                        
                       {internal:"./config",
                       external:"/etc/hyperledger/configtx"}]};
    for (var peer of peers){
        var element = {internal:"./crypto-config/peerOrganizations/"+peer.getDomain()+"/peers/"+peer.getAllId()+"/",
                        external:"/etc/hyperledger/msp/"+peer.getAllId()
                        } 
        config.volumes.push(element)      
    }
    return config;
}
module.exports= createOrdererConfig;