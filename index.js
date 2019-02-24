var fs = require('fs');
var path = require('path');

const { execSync } = require('child_process');

const Peer = require('./src/peer');
const Network = require('./src/network');
const Organization = require('./src/organization');
const Orderer = require('./src/orderer');

var gen= require('./lib/generator/yalmGenerator');
var crypto = require('./lib/generator/cryptoYaml');

// async function cryptotx() {
//     const { stdout, stderr } =  exec('cryptogen generate --config=crypto-config.yaml --output=crypto-config');
//     console.log('stdout:', stdout);
//     console.log('stderr:', stderr);
//   }

//constructor(id,extPort, intPort, extra='')
var peer1=new Peer('peer1','meta.com',4583,5698);
//console.log(peer1.toJSON());

var nuevo={};
nuevo["PeerID"]="ostra";
//console.log(nuevo);

let myred = new Network('myred','mired.com');


//  constructor(name,extPort, intPort, extra){
let orderer= new Orderer('Orderer','orderer', 5247,6374);

// constructor(name, orgId,ca_name, mspId,domain){
let org1 = new Organization('Digibank', 'digi', 'digiCA','DigibankMSP','digibank.mired.com');

//console.log(org1)

myred.addOrg(org1)

myred.addPeer(peer1,org1.getAllId())

myred.addOrderer(orderer)
//console.log(myred.toJSON())


//console.log([[peer1,peer1].)
//console.log(json)
//TODO funcion para crear rutas de proyecto
//var peerjson= gen(peer1,'peer');
cryptoYaml= crypto(myred)
fs.writeFileSync('./crypto-config.yaml',cryptoYaml);  
try{
    const rm = execSync('rm -r crypto-config');
}catch(error){

}
const cryptotx = execSync('cryptogen generate --config=crypto-config.yaml --output=crypto-config');

//console.log(myred.toJSON())
var key;
var list = fs.readdirSync("./crypto-config/peerOrganizations/"+org1.getDomain()+"/ca/");
    for(var i=0; i<list.length; i++)
    {
        if(!( path.extname(list[i]).includes(org1.getDomain())))
        {
            key = list[i]
        }
        console.log(list[i])
    }

console.log(key)

    
myYaml = gen(myred)
fs.writeFileSync('./org.yaml', myYaml); 
