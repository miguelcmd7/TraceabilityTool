var fs = require('fs');
var path = require('path');

function createCAConfig(ca_name,domain,key){
    

    var config = {volumes:[{internal:"./crypto-config/peerOrganizations"+domain+"/ca/",
                       external:"/etc/hyperledger/fabric-ca-server-config"},                        
                       {internal:"./config",
                       external:"/etc/hyperledger/configtx"}]};
   
   config.key=key;
   
   return config;
}
module.exports= createCAConfig;