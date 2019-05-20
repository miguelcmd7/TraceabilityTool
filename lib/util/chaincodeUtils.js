const _ = require("./util");
const fs = require("fs");
const path = require("path");

const Client = require("fabric-client");

const Orderer = require('../../src/common/orderer');
const Org = require('../../src/common/organization');

function readAllFiles(dir) {
    const files = fs.readdirSync(dir);
    const certs = [];
    files.forEach(file_name => {
      const file_path = path.join(dir, file_name);
      //logger.debug(' looking at file ::' + file_path);
      const data = fs.readFileSync(file_path);
      certs.push(data);
    });
    return certs;
  }

/**
 * 
 * @param {Orderer} orderer 
 */
function getCARoots(orderer){
    var relativePath = "/crypto-config/ordererOrganizations/"+orderer.getDomain()+"/orderers/"+orderer.getAllId()+"/tls/ca.crt"
   
   
    var data = _( [relativePath]);
    var caroots = Buffer.from(data).toString();
    return caroots;
   }


function getPemPeer(peer,orgid){

    return _(["crypto-config/peerOrganizations",+orgid+"/peers/"+peer.getAllId()+"/tls/ca.crt"])
  }
  

async function initClient(channel,org){
    const client = new Client();
    var store = await Client.newDefaultKeyValueStore({ path: "/tmp/net-export/"+org })
    client.setStateStore(store);
    const cryptoSuite = Client.newCryptoSuite();
    cryptoSuite.setCryptoKeyStore(Client.newCryptoKeyStore({ path: "/tmp/net-export/"+org }));
    client.setCryptoSuite(cryptoSuite);
   return client;
}

  /**
   * 
   * @param {Client} client 
   * @param {Org} userOrg 
   */
  function getAdmin(client,  userOrg) {
	const keyPath = _([  "/crypto-config/peerOrganizations/"+userOrg.getAllId()+"/users/Admin@"+userOrg.getAllId()+"/msp/keystore"]);
	const keyPEM = Buffer.from(readAllFiles(keyPath)[0]).toString();
	const certPath = _([  "/crypto-config/peerOrganizations/"+userOrg.getAllId()+"/users/Admin@"+userOrg.getAllId()+"/msp/signcerts"]);
	const certPEM = readAllFiles(certPath)[0];

	const cryptoSuite = Client.newCryptoSuite();
	if (userOrg) {
		cryptoSuite.setCryptoKeyStore(Client.newCryptoKeyStore({path:"/tmp/net-export/"+userOrg.getOrgId()}));
		client.setCryptoSuite(cryptoSuite);
    }
    return Promise.resolve(client.createUser({
		username: 'peer' + userOrg + 'Admin',
		mspid: userOrg.getMspId(),
		cryptoContent: {
			privateKeyPEM: keyPEM.toString(),
			signedCertPEM: certPEM.toString()
		}
	}));
  }
  function getOrdererAdmin(client,orderer) {
    const keyPath = _([
      "/crypto-config/ordererOrganizations/"+orderer.getDomain()+"/users/Admin@"+orderer.getDomain()+"/msp/keystore"
    ]);
  
    const keyPEM = Buffer.from(readAllFiles(keyPath)[0]).toString();
    const certPath = _([
      "/crypto-config/ordererOrganizations/"+orderer.getDomain()+"/users/Admin@"+orderer.getDomain()+"/msp/signcerts"
    ]);
    const certPEM = readAllFiles(certPath)[0];
  
    return Promise.resolve(
      client.createUser({
        username: orderer.getId()+"Admin",
        mspid: "OrdererMSP",
        cryptoContent: {
          privateKeyPEM: keyPEM.toString(),
          signedCertPEM: certPEM.toString()
        }
      })
    );
  }

  module.exports = {readAllFiles,getAdmin,initClient,getCARoots,getPemPeer,getOrdererAdmin}