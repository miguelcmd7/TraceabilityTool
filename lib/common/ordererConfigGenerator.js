function createOrdererConfig(orderer,peers=[]){

    
    var config = {volumes:[{external:"./crypto-config/ordererOrganizations/"+orderer.getDomain()+"/orderers/"+orderer.getAllId()+"/",
                       internal:"/etc/hyperledger/msp/orderer"},                        
                       {external:"./config",
                       internal:"/etc/hyperledger/configtx"}]};
    for (var peer of peers){
        var element = {external:"./crypto-config/peerOrganizations/"+peer.getDomain()+"/peers/"+peer.getAllId()+"/",
                        internal:"/etc/hyperledger/msp/"+peer.getAllId()
                        } 
        config.volumes.push(element)      
    }
    return config;
}
module.exports= createOrdererConfig;