var fs = require('fs');
var path = require('path');


const { execSync,exec } = require('child_process');

const Peer = require('./src/peer');
const Network = require('./src/network');
const Organization = require('./src/organization');
const Orderer = require('./src/orderer');
const Channel = require('./src/channel');
const PeerConfig = require('./src/peerConf');

process.env.DEST_DIRECTORY='/home/miguel/Proyectos/TraceabilityTool'

var gen= require('./lib/generator/yalmGenerator');
var crypto = require('./lib/generator/cryptoYaml');
var config = require('./lib/generator/configtxYaml');

// async function cryptotx() {
//     const { stdout, stderr } =  exec('cryptogen generate --config=crypto-config.yaml --output=crypto-config');
//     console.log('stdout:', stdout);
//     console.log('stderr:', stderr);
//   }


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
//console.log(peer1.toJSON());

var nuevo={};
nuevo["PeerID"]="ostra";
//console.log(nuevo);

let myred = new Network('myred','mired.com');


//  constructor(name,extPort, intPort, extra){
let orderer= new Orderer('Orderer','orderer','mired.com', 5247,7060);

// constructor(name, orgId,ca_name, mspId,domain){
let org1 = new Organization('Digibank', 'digibank', 'digiCA','DigibankMSP','mired.com');

//constructor(name,consortium,orgs=[],peers=[],orderers=[])b
let channel = new Channel('mycc','SampleConsortium',['digibank.mired.com'],['peer1.digibank.mired.com','peer2.digibank.mired.com'],['orderer.mired.com'])
//console.log(org1)

myred.addOrg(org1)

myred.addOrderer(orderer)
myred.addPeer(peer1,org1.getAllId())
myred.addPeer(peer2,org1.getAllId())
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
    execSync('docker-compose -f docker-compose.yaml down ')
    execSync('rm -r crypto-config');
}catch(error){

}

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
                        for (let orgMsp of myred.getChannelOrgs(channel))
                             execSync('configtxgen -profile OneOrgChannel -outputAnchorPeersUpdate ./config/Org1MSPanchors.tx -channelID '+channel.getName()+' -asOrg '+orgMsp )
                        
                    let networkYaml = gen(myred);
                    fs.writeFileSync('./docker-compose.yaml',networkYaml); 
                    execSync('configtxgen -profile OneOrgOrdererGenesis -outputBlock ./config/genesis.block')
                    execSync('docker-compose -f docker-compose.yaml up ');
                    }
                }) 
            })


    
    //exec('cryptogen generate --config=crypto-config.yaml >>/dev/null');


 
    


//console.log(myred.toJSON())





    
// myYaml = gen(myred)
// fs.writeFileSync('./org.yaml', myYaml); 
