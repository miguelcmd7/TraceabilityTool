const { execSync,exec } = require('child_process');
var fs = require('fs');
exec('cryptogen generate --config=crypto-config.yaml >>/dev/null',(err,stdout,stederr)=>{
    if(err)
        console.log('Error cryptogen');
    else
        exec('configtxgen -profile OneOrgOrdererGenesis -outputBlock ./config/genesis.block',(err,stdout,stederr)=>{
            if(err)
                console.log('Error cryptogen');
            else{
                for (let chann of myred.getChannels())
                    execSync('configtxgen -profile OneOrgChannel -outputCreateChannelTx ./config/channel.tx -channelID '+ chann.getName())
                    for (let orgMsp of myred.getChannelOrgs(channel)){
                         execSync('configtxgen -profile OneOrgChannel -outputAnchorPeersUpdate ./config/Org1MSPanchors.tx -channelID '+channel.getName()+' -asOrg '+orgMsp )
                let networkYaml = gen(myred);
                fs.writeFileSync('./docker-compose.yaml',networkYaml); 
                execSync('configtxgen -profile OneOrgOrdererGenesis -outputBlock ./config/genesis.block')
                execSync('docker-compose -f docker-compose.yaml up -d');
               }
            }) 
        })
