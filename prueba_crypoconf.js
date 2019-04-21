// const { execSync,exec } = require('child_process');
// var fs = require('fs');
// exec('cryptogen generate --config=crypto-config.yaml >>/dev/null',(err,stdout,stederr)=>{
//     if(err)
//         console.log('Error cryptogen');
//     else
//         exec('configtxgen -profile OneOrgOrdererGenesis -outputBlock ./config/genesis.block',(err,stdout,stederr)=>{
//             if(err)
//                 console.log('Error cryptogen');
//             else{
//                 for (let chann of myred.getChannels())
//                     execSync('configtxgen -profile OneOrgChannel -outputCreateChannelTx ./config/channel.tx -channelID '+ chann.getName())
//                     for (let orgMsp of myred.getChannelOrgs(channel)){
//                          execSync('configtxgen -profile OneOrgChannel -outputAnchorPeersUpdate ./config/Org1MSPanchors.tx -channelID '+channel.getName()+' -asOrg '+orgMsp )
//                 let networkYaml = gen(myred);
//                 fs.writeFileSync('./docker-compose.yaml',networkYaml); 
//                 execSync('configtxgen -profile OneOrgOrdererGenesis -outputBlock ./config/genesis.block')
//                 execSync('docker-compose -f docker-compose.yaml up -d');
//                }
//             }) 
//         })
var fs = require('fs');
var path = require('path');
process.env.DEST_DIRECTORY='/home/miguel/Proyectos/TraceabilityTool'

function rev(strings){
    if (strings.length == 0)
        return '';
    else{
        let element = strings.pop();
        console.log(strings);
        return path.join(rev(strings),element)
    }
}
function _(strings){
    if (strings== [])
        return ''
    else
        return path.join(process.env.DEST_DIRECTORY,rev(strings))

}

//console.log(path.join('holamundo','Holaminfo'))   
//console.log([process.env.DEST_DIRECTORY].concat(['holamundo']))

//console.log(process.env.DEST_DIRECTORY)
let strings=['holamundo','asd1','asd']
console.log(strings.pop())
console.log(strings)
console.log(_(['holamundo','asdq','asd']))


