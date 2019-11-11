// var fs = require('fs');
// var path = require('path');


// const { execSync, exec } = require('child_process');

// const ChannelBuilder = require("../lib/util/channelCreator")
// const Network = require('../src/common/network');
// const Orderer = require('../src/common/orderer');
// const Channel = require('../src/common/channel');
const PeerConfig = require('../src/common/peerConf');
const modelNetwork = require('../src/models/modelNetwork.js');
const modelOrg = require('../src/models/modelOrganization.js');
const modelPeer = require('../src/models/modelPeer.js');
const modelOrderer = require('../src/models/modelOrderer.js');
// const ModelChannel = require('../src/models/modelChannel.js');
const _ = require('../lib/util/util');


const NUM_OF_ORGS = 80

const NUM_OF_PEERS = 5

process.env.DEST_DIRECTORY = '/home/miguel/Hyperledger/ejemplo5'

// var gen = require('../lib/generator/yalmGenerator');
// var crypto = require('../lib/generator/cryptoYaml');
// var config = require('../lib/generator/configtxYaml');

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

let myred = modelNetwork.createNetwork('myred', 'mired.com');
//let myred2 = Model.createNetwork('MYRED','miredDPM.com');

for(let org_index = 0; org_index<NUM_OF_ORGS; org_index++ ){
    modelOrg.createOrg('Digibank', 'digibank'+org_index, 'digiCA', 'DigibankMSP');
    for(let peer_index = 0;peer_index<NUM_OF_PEERS;peer_index++ ){
        modelPeer.createPeer('peer'+peer_index,'digibank'+org_index,  configPeer);
    }
}


//console.log(modelNetwork.getNetwork()).getPeersByOrgs();
let orderer = modelOrderer.createOrderer('Orderer', 'orderer',  5247, 7060);

//ModelChannel.createChannel('mycc', 'SampleConsortium', ['orderer'], new Map().set('digibank',['peer1','peer2']) )
//console.log(peer1.toJSON());
//let channel = Model.createChannel('mycc','SampleConsortium',['digibank.mired.com'],['peer1.digibank.mired.com','peer2.digibank.mired.com'],['orderer.mired.com'])
//var nuevo={};
//nuevo["PeerID"]="ostra";
//console.log(nuevo);

// console.log(Network.getInstance().getChannels())

// console.log(Network.getInstance().getChannel('mycc'))

modelNetwork.build().then(()=>{
    //  return modelNetwork.launch().then( ()=>{
    //     //  modelNetwork.installChaincode('digibank.mired.com','mycc').then(()=>{
    //     //     modelNetwork.instanciateChaincode('digibank.mired.com','mycc').then(()=>{
    //     //         setTimeout(()=>{
    //     //          modelNetwork.invokeChaincode('digibank.mired.com','mycc').then(()=>{
    //     //             modelNetwork.queryChaincode('digibank.mired.com','mycc')

    //     //          })
    //     //         },1500)
                 
    //     //       })
    //     //  })
        
       
         
    //  })
 })