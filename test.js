const Peer = require('./src/peer');
const Network = require('./src/network');
const Organization = require('./src/organization');
const Orderer = require('./src/orderer');
const Channel = require('./src/channel');
const PeerConfig = require('./src/peerConf');


let configPeer  = new PeerConfig({
    extPort:7060,
    anchor: true,
    intPort:7051,
    extGossipPort:7063,
    intGossipPort:7053
});
let configPeer2  = new PeerConfig({
    extPort:7070,
    anchor: true,
    intPort:7051,
    extGossipPort:7073,
    intGossipPort:7053
});
var peer1=new Peer('peer1','digibank.mired.com', configPeer);
var peer2=new Peer('peer2','digibank.mired.com', configPeer2);

let myred = new Network('myred','mired.com');


//  constructor(name,extPort, intPort, extra){
let orderer= new Orderer('Orderer','orderer','mired.com', 5247,7060);

// constructor(name, orgId,ca_name, mspId,domain){
let org1 = new Organization('Digibank', 'digibank', 'digiCA','DigibankMSP','mired.com');

//constructor(name,consortium,orgs=[],peers=[],orderers=[])
let channel = new Channel('mycc','SampleConsortium',['digibank.mired.com'],['peer1.digibank.mired.com','peer2.digibank.mired.com'],['orderer.mired.com'])
//console.log(org1)

myred.addOrg(org1)

myred.addOrderer(orderer)
myred.addPeer(peer1,org1.getAllId())
myred.addPeer(peer2,org1.getAllId())
myred.addChannel(channel);

console.log(channel.getPeers().length);
channel.removePeer('peer1.digibank.mired.com')
console.log(channel.getPeers().length);
