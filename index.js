const Peer = require('./src/peer');
const Network = require('./src/network');
const Organization = require('./src/organization');
const Orderer = require('./src/orderer');
const Write= require('write-yaml');
var fs = require('fs');
var gen= require('./lib/generator/yalmGenerator');
var crypto = require('./lib/generator/cryptoYaml');

//constructor(id,extPort, intPort, extra='')
var peer1=new Peer('peer1','meta.com',4583,5698);
console.log(peer1.toJSON());

var nuevo={};
nuevo["PeerID"]="ostra";
console.log(nuevo);

let myred = new Network('myred','mired.com');


//  constructor(name,extPort, intPort, extra){
let orderer= new Orderer('Orderer','orderer', 5247,6374);

// constructor(name, orgId,ca_name, mspId,domain){
let org1 = new Organization('Digibank', 'digi', 'digiCA','DigibankMSP','digibank.mired.com');

console.log(org1)

myred.addOrg(org1)

myred.addPeer(peer1,org1.getAllId())

myred.addOrderer(orderer)
//console.log(myred.toJSON())

myYaml = gen(myred)
//console.log([[peer1,peer1].)
//console.log(json)
//TODO funcion para crear rutas de proyecto
//var peerjson= gen(peer1,'peer');
cryptoYaml= crypto(myred)

fs.writeFileSync('./org.yaml',myYaml); 
fs.writeFileSync('./crypto-config.yaml',cryptoYaml);  