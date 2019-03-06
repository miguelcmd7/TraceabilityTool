function createPeerConfig(peer,depends=[]){

    
     var config = {volumes:[{external:"./crypto-config/peerOrganizations/"+peer.getDomain()+"/peers/"+peer.getAllId()+"/msp",
                        internal:"/etc/hyperledger/msp/peer"},                        
                        {external:"./crypto-config/peerOrganizations/"+peer.getDomain()+"/users",
                        internal:"/etc/hyperledger/msp/users"},
                        {external:"./config",
                        internal:"/etc/hyperledger/configtx"}]};
    
    if (depends !=[]){
        config.depends_on=depends
    }

    return config;

}
module.exports= createPeerConfig;