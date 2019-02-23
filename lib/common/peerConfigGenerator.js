function createPeerConfig(peer,depends=[]){

    
     var config = {volumes:[{internal:"./crypto-config/peerOrganizations/"+peer.getDomain()+"/peers/"+peer.getAllId()+"/msp",
                        external:"/etc/hyperledger/msp/peer"},                        
                        {internal:"./crypto-config/peerOrganizations/"+peer.getDomain()+"/users",
                        external:"/etc/hyperledger/msp/users"},
                        {internal:"./config",
                        external:"/etc/hyperledger/configtx"}]};
    
    if (depends !=[]){
        config.depends_on=depends
    }

    return config;

}
module.exports= createPeerConfig;