var fs = require('fs');
var path = require('path');


const { execSync } = require('child_process');

const Peer = require('./src/peer');
const Network = require('./src/network');
const Organization = require('./src/organization');
const Orderer = require('./src/orderer');
const Channel = require('./src/channel');

process.env.DEST_DIRECTORY='/home/miguel/Proyectos/TFG'

var gen= require('./lib/generator/yalmGenerator');
var crypto = require('./lib/generator/cryptoYaml');
var config = require('./lib/generator/configtxYaml');

// async function cryptotx() {
//     const { stdout, stderr } =  exec('cryptogen generate --config=crypto-config.yaml --output=crypto-config');
//     console.log('stdout:', stdout);
//     console.log('stderr:', stderr);
//   }

//constructor(id,domain,extPort, intPort,anchor = false, extra=''){
var peer1=new Peer('peer1','digibank.mired.com',4583,5698,true);
//console.log(peer1.toJSON());

var nuevo={};
nuevo["PeerID"]="ostra";
//console.log(nuevo);

let myred = new Network('myred','mired.com');


//  constructor(name,extPort, intPort, extra){
let orderer= new Orderer('Orderer','orderer','mired.com', 5247,6374);

// constructor(name, orgId,ca_name, mspId,domain){
let org1 = new Organization('Digibank', 'digi', 'digiCA','DigibankMSP','digibank.mired.com');

//constructor(name,consortium,orgs=[],peers=[],orderers=[])b
let channel = new Channel('mycc','SampleConsortium',['digi.digibank.mired.com'],['peer1.digibank.mired.com'],['orderer.mired.com'])
//console.log(org1)

myred.addOrg(org1)

myred.addOrderer(orderer)
myred.addPeer(peer1,org1.getAllId())
myred.addChannel(channel);


console.log(myred.configtxJSON())

//console.log([[peer1,peer1].)
//console.log(json)
//TODO funcion para crear rutas de proyecto
//var peerjson= gen(peer1,'peer');

let configYaml = config(myred);
//console.log(configYaml)
// cryptoYaml= crypto(myred)
 fs.writeFileSync('./configtx.yaml',configYaml);  
// try{
//     const rm = execSync('rm -r crypto-config');
// }catch(error){

// }
// const cryptotx = execSync('cryptogen generate --config=crypto-config.yaml --output=crypto-config');

//console.log(myred.toJSON())



console.log(configYaml.orgs)

    
// myYaml = gen(myred)
// fs.writeFileSync('./org.yaml', myYaml); 
