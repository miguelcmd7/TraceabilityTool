var fs = require('fs');
var path = require('path');


const { execSync } = require('child_process');

const Peer = require('./src/peer');
const Network = require('./src/network');
const Organization = require('./src/organization');
const Orderer = require('./src/orderer');
const Channel = require('./src/channel');
const PeerConfig = require('./src/peerConf');

process.env.DEST_DIRECTORY='/home/miguel/Proyectos/TFG/TraceabilityTool'

var gen= require('./lib/generator/yalmGenerator');
var crypto = require('./lib/generator/cryptoYaml');
var config = require('./lib/generator/configtxYaml');

// async function cryptotx() {
//     const { stdout, stderr } =  exec('cryptogen generate --config=crypto-config.yaml --output=crypto-config');
//     console.log('stdout:', stdout);
//     console.log('stderr:', stderr);
//   }


let configPeer  = new PeerConfig({
    extPort:7050,
    anchor: true
});
var peer1=new Peer('peer1','digibank.mired.com', configPeer);
//console.log(peer1.toJSON());

var nuevo={};
nuevo["PeerID"]="ostra";
//console.log(nuevo);

let myred = new Network('myred','mired.com');


//  constructor(name,extPort, intPort, extra){
let orderer= new Orderer('Orderer','orderer','mired.com', 5247,6374);

// constructor(name, orgId,ca_name, mspId,domain){
let org1 = new Organization('Digibank', 'digibank', 'digiCA','DigibankMSP','mired.com');

//constructor(name,consortium,orgs=[],peers=[],orderers=[])b
let channel = new Channel('mycc','SampleConsortium',['digibank.mired.com'],['peer1.digibank.mired.com'],['orderer.mired.com'])
//console.log(org1)

myred.addOrg(org1)

myred.addOrderer(orderer)
myred.addPeer(peer1,org1.getAllId())
myred.addChannel(channel);



//console.log(myred.configtxJSON())

//console.log([[peer1,peer1].)
//console.log(json)
//TODO funcion para crear rutas de proyecto
//var peerjson= gen(peer1,'peer');

let configYaml = config(myred);
//console.log(configYaml)
let   cryptoYaml= crypto(myred)
fs.writeFileSync('./configtx.yaml',configYaml);  
fs.writeFileSync('./crypto-config.yaml',cryptoYaml); 

try{
    const rm = execSync('rm -r crypto-config');
}catch(error){

}
const cryptotx = execSync('cryptogen generate --config=crypto-config.yaml --output=crypto-config');

execSync('configtxgen -profile OneOrgOrdererGenesis -outputBlock ./config/genesis.block')
 
for (let chann of myred.getChannels())
    execSync('configtxgen -profile OneOrgChannel -outputCreateChannelTx ./config/channel.tx -channelID '+ chann.getName())
    for (let orgMsp of myred.getChannelOrgs(channel)){
        execSync('configtxgen -profile OneOrgChannel -outputAnchorPeersUpdate ./config/Org1MSPanchors.tx -channelID '+channel.getName()+' -asOrg '+orgMsp )
    }    

let networkYaml = gen(myred);
fs.writeFileSync('./docker-compose.yaml',networkYaml); 
//console.log(myred.toJSON())


execSync('docker-compose -f docker-compose.yaml up -d')


    
// myYaml = gen(myred)
// fs.writeFileSync('./org.yaml', myYaml); 
