var fs = require('fs');
var path = require('path');


const { execSync, exec } = require('child_process');

const ChannelBuilder = require("./lib/util/channelCreator")
const Network = require('./src/common/network');
const Orderer = require('./src/common/orderer');
const Channel = require('./src/common/channel');
const PeerConfig = require('./src/common/peerConf');
const modelNetwork = require('./src/models/modelNetwork.js');
const modelOrg = require('./src/models/modelOrganization.js');
const modelPeer = require('./src/models/modelPeer.js');
const modelOrderer = require('./src/models/modelOrderer.js');
const ModelChannel = require('./src/models/modelChannel.js');
const _ = require('./lib/util/util');


process.env.DEST_DIRECTORY = '/home/miguel/Hyperledger/ejemplo'

var gen = require('./lib/generator/yalmGenerator');
var crypto = require('./lib/generator/cryptoYaml');
var config = require('./lib/generator/configtxYaml');

// async function cryptotx() {
//     const { stdout, stderr } =  exec('cryptogen generate --config=crypto-config.yaml --output=crypto-config');
//     console.log('stdout:', stdout);
//     console.log('stderr:', stderr);
//   }




let configPeer = new PeerConfig({
    extPort: 7060,
    anchor: true,
    intPort: 7051,
    extGossipPort: 7063,
    intGossipPort: 7053
});
let configPeer2 = new PeerConfig({
    extPort: 7070,
    anchor: true,
    intPort: 7051,
    extGossipPort: 7073,
    intGossipPort: 7053
});
let myred = modelNetwork.createNetwork('myred', 'mired.com');
//let myred2 = Model.createNetwork('MYRED','miredDPM.com');

console.log(modelNetwork.getNetwork());
//console.log(myred.toJSON())
//console.log(myred2.toJSON())
let org1 = modelOrg.createOrg('Digibank', 'digibank', 'digiCA', 'DigibankMSP');
//console.log(modelNetwork.getNetwork()).getPeersByOrgs();
let orderer = modelOrderer.createOrderer('Orderer', 'orderer',  5247, 7060);

var peer1 = modelPeer.createPeer('peer1','digibank',  configPeer);
var peer2 = modelPeer.createPeer('peer2','digibank',  configPeer2);
ModelChannel.createChannel('mycc', 'SampleConsortium', ['orderer'], new Map().set('digibank',['peer1','peer2']) )
//console.log(peer1.toJSON());
//let channel = Model.createChannel('mycc','SampleConsortium',['digibank.mired.com'],['peer1.digibank.mired.com','peer2.digibank.mired.com'],['orderer.mired.com'])
//var nuevo={};
//nuevo["PeerID"]="ostra";
//console.log(nuevo);

// console.log(Network.getInstance().getChannels())

// console.log(Network.getInstance().getChannel('mycc'))

modelNetwork.build().then(()=>{
     return modelNetwork.launch().then( ()=>{
         modelNetwork.installChaincode('digibank.mired.com','mycc').then(()=>{
            modelNetwork.instanciateChaincode('digibank.mired.com','mycc').then(()=>{
                setTimeout(()=>{
                 modelNetwork.invokeChaincode('digibank.mired.com','mycc').then(()=>{
                    modelNetwork.queryChaincode('digibank.mired.com','mycc')

                 })
                },1500)
                 
              })
         })
       
         
     })
 })
 

//modelNetwork.launch()
//  constructor(name,extPort, intPort, extra){


// constructor(name, orgId,ca_name, mspId,domain){


//constructor(name,consortium,orgs=[],peers=[],orderers=[])b

//console.log(org1)




//console.log(myred.configtxJSON())

//console.log([[peer1,peer1].)
//console.log(json)
//TODO funcion para crear rutas de proyecto
//var peerjson= gen(peer1,'peer');

// let configYaml = config(Network.getInstance());
// //console.log(configYaml)
// let cryptoYaml = crypto(Network.getInstance())
// fs.writeFileSync(_(['configtx.yaml']), configYaml);
// fs.writeFileSync(_(['crypto-config.yaml']), cryptoYaml);



// console.log('cryptogen generate --config=' + _(['crypto-config.yaml']))
// //execSync('cryptogen generate --config=' + _(['crypto-config.yaml']) +' --output='+_(['crypto-config'])); 
// exec('cryptogen generate --config=' + _(['crypto-config.yaml']) +' --output='+_(['crypto-config']) , (err, stdout, stederr) => {
//     if (err)
//         console.log('Error cryptogen');
//     else
//         exec('configtxgen -configPath '+ process.env.DEST_DIRECTORY+' -profile OneOrgOrdererGenesis -outputBlock ' + _(['config', 'genesis.block']), (err, stdout, stederr) => {
//             if (err) {
//                 console.log('configtxgen -configPath '+process.env.DEST_DIRECTORY+' -profile OneOrgOrdererGenesis -outputBlock ' + _(['config', 'genesis.block']))
//                 console.log('Error configtxgen');
//             }
//             else {
//                 for (let channel of Network.getInstance().getChannels()){
//                     execSync('configtxgen -configPath '+ process.env.DEST_DIRECTORY+' -profile OneOrgChannel -outputCreateChannelTx ' + _(['config', 'channel.tx']) + ' -channelID ' + channel.getName())

//                     for (let orgMsp of Network.getInstance().getChannelOrgs(channel))
//                         execSync('configtxgen -configPath '+ process.env.DEST_DIRECTORY+' -profile OneOrgChannel -outputAnchorPeersUpdate ' + _(['config', 'Org1MSPanchors.tx']) + ' -channelID ' + channel.getName() + ' -asOrg ' + orgMsp)
//                 }
//                 let networkYaml = gen(Network.getInstance());
//                 fs.writeFileSync(_(['docker-compose.yaml']), networkYaml);
//                 execSync('configtxgen -configPath '+ process.env.DEST_DIRECTORY+' -profile OneOrgOrdererGenesis -outputBlock ' + _(['config', 'genesis.block']))
//                 execSync('docker-compose -f ' + _(['docker-compose.yaml']) + ' up -d ');
//                 setTimeout(()=>{
//                     for (let channel of Network.getInstance().getChannels()){
//                         ChannelBuilder.initChannel(channel,Network.getInstance());
//                     }
//                 },15)
//             }
//         })
// })



    //exec('cryptogen generate --config=crypto-config.yaml >>/dev/null');






//console.log(myred.toJSON())






// myYaml = gen(myred)
// fs.writeFileSync('./org.yaml', myYaml); 
