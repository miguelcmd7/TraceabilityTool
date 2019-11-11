
const _ = require('../util/util')
const { execSync, exec } = require('child_process');

 function cryptoGen(net){
    return new Promise((resolve,reject)=>{exec('cryptogen generate --config=' + _(['crypto-config.yaml']) +' --output='+_(['crypto-config']) , (err, stdout, stederr) => {
        if (err)
            console.log('Error cryptogen');
        else
        exec('configtxgen -configPath '+ process.env.DEST_DIRECTORY+' -profile OneOrgOrdererGenesis -outputBlock ' + _(['config', 'genesis.block']), (err, stdout, stederr) => {
                if (err) {
                    console.log('configtxgen -configPath '+process.env.DEST_DIRECTORY+' -profile OneOrgOrdererGenesis -outputBlock ' + _(['config', 'genesis.block']))
                    console.log('Error configtxgen');
                }
                else {
                    for (let channel of net.getChannels()){
                        execSync('configtxgen -configPath '+ process.env.DEST_DIRECTORY+' -profile OneOrgChannel -outputCreateChannelTx ' + _(['config', 'channel.tx']) + ' -channelID ' + channel.getName())

                        for (let orgMsp of net.getChannelOrgs(channel))
                            execSync('configtxgen -configPath '+ process.env.DEST_DIRECTORY+' -profile OneOrgChannel -outputAnchorPeersUpdate ' + _(['config', 'Org1MSPanchors.tx']) + ' -channelID ' + channel.getName() + ' -asOrg ' + orgMsp)
                    }
                    resolve()
                }
            })
    })}
    )
}

module.exports= cryptoGen;
