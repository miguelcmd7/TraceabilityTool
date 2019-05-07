const _ = require("./util");
const fs = require("fs");
const path = require("path");
const { execSync, exec } = require("child_process");
const Client = require("fabric-client");
let signatures=[]
let config = null;
let orderer = null;
const Channel = require('../../src/common/channel');
const Orderer = require('../../src/common/orderer');
const Org = require('../../src/common/organization');
const Network  = require('../../src/common/network');

//process.env.DEST_DIRECTORY = "/home/miguel/Hyperledger/ejemplo";

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
/**
 * 
 * @param {Client} client 
 * @param {Orderer} orderer 
 */
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


/**
* 
* @param {Channel} channel
* @param {Network} network
* 
*/
async function initChannel(channel,network){
    Client.addConfigFile(_(["config.json"]));
    const client = new Client();
    var first= true;
    var signatures=[];
    const envelope_bytes = fs.readFileSync(_(["config", "channel.tx"]));
    var config = client.extractChannelConfig(envelope_bytes);
    let targets;

    for (var org of channel.getOrgs()){
        if (first){
            console.log(org);
            var store = await Client.newDefaultKeyValueStore({ path: "/tmp/net-export/"+org })
            client.setStateStore(store);
            const cryptoSuite = Client.newCryptoSuite();
            cryptoSuite.setCryptoKeyStore(Client.newCryptoKeyStore({ path: "/tmp/net-export/"+org }));
            client.setCryptoSuite(cryptoSuite);
            first=false;
        }
       await getAdmin(client,network.getOrg(org))
       let signature = client.signChannelConfig(config);
       signatures.push(signature);

    }
    
    for(var ordererId of channel.getOrderers()){
        console.log(ordererId);
        var orderer = network.getOrderer(ordererId)
       var reqOrderer = client.newOrderer(
            "grpc://localhost:"+orderer.getExtPort(),
            {
                name: orderer.getId(),
                'pem': getCARoots(orderer),
                'ssl-target-name-override': orderer.getAllId()
            }
        );
        await getOrdererAdmin(client,orderer)
        let signature = client.signChannelConfig(config);
        signatures.push(signature);
    }
    let tx_id = client.newTransactionID();
    var request = {
    config: config,
    signatures: signatures,
    name: channel.getName(),
    orderer: reqOrderer,
    txId: tx_id
    }
    var response  = await client.createChannel(request)
    console.log(response.status)

    var channelReq = client.newChannel(channel.getName())
    channelReq.addOrderer(reqOrderer);
    tx_id = client.newTransactionID();
    
    request = {
      txId:tx_id
    }
    var genesis = await channelReq.getGenesisBlock(request);
    client._userContext = null;
    
    for (var orgId of channel.getOrgs()){
      targets =[]
      await getAdmin(client,network.getOrg(org))
      
      for (var peerId of channel.getPeers() ){
        if ( peerId.indexOf(orgId) > -1){
          console.log(peerId)
          let  peer = network.getPeer(peerId);
          targets.push(client.newPeer(
            "grpc://localhost:"+peer.getExtPort(),
            {
              pem:getPemPeer(peer,org),
              'ssl-target-name-override':peer.getAllId()
            }
          ));
        }
      }
      tx_id = client.newTransactionID();
      request = {
				targets : targets,
				block : genesis,
				txId : 	tx_id
			};

      let result = await channelReq.joinChannel(request, 30000);
      console.log(result);
    }   
   
    


    return response
    
}

function getPemPeer(peer,orgid){

  return _(["crypto-config/peerOrganizations",+orgid+"/peers/"+peer.getAllId()+"/tls/ca.crt"])
}

//function joinChannel()

module.exports.initChannel = initChannel

