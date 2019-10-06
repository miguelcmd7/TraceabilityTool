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
modelNetwork.queryChaincode('digibank.mired.com','mycc')