var fs = require('fs');
var path = require('path');

function createCAConfig(domain){
    
    var key;
    var config = {volumes:[{external:"./crypto-config/peerOrganizations/"+domain+"/ca/",
                       internal:"/etc/hyperledger/fabric-ca-server-config"},                        
                       {external:"./config",
                       internal:"/etc/hyperledger/configtx"}]};
   
    var list = fs.readdirSync(process.env.DEST_DIRECTORY+"/crypto-config/peerOrganizations/"+domain+"/ca/");
    for(var i=0; i<list.length; i++)
    {
        if( list[i].indexOf(domain)<=-1)
        {
            key = list[i]
        }
        
    }
   config.key=key;
   
   return config;
}
module.exports= createCAConfig;