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


  async function installChaincode (orgId, network, channel, chaincode_id,chaincode_path,version,language){
    let client = await initClient(channel,orgId);
    
    const channelReq =  client.newChannel(channel.getName());
   
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
        )
        
    }
    channelReq.addOrderer(reqOrderer);
    const org  = network.getOrg(orgId)
    const targets = [];
    for (var peerId of channel.getPeers() ){
        if ( peerId.indexOf(orgId) > -1){
          console.log(peerId)
          let  peer = network.getPeer(peerId);
          let peerReq= client.newPeer(
            "grpc://localhost:"+peer.getExtPort(),
            {
              pem:getPemPeer(peer,orgId),
              'ssl-target-name-override':peer.getAllId()
            }
          )
            targets.push(peerReq );
            channelReq.addPeer(peerReq);
        }
      }
    await getAdmin(client,network.getOrg(orgId))
    const request = {
        targets: targets,
        chaincodePath: chaincode_path,
        //metadataPath: metadata_path,
        chaincodeId: chaincode_id,
        chaincodeType: language,
        chaincodeVersion: version
    };

    let response = await client.installChaincode(request);
    console.log(response[0]);
    const request2 = buildChaincodeProposal(client, chaincode_id, chaincode_path, version, language,targets);
	  let tx_id = request2.txId;
    console.log( await channelReq.initialize())
    response = await channelReq.sendInstantiateProposal(request2, 10 * 60 * 1000);
    console.log(response[0]);
  }

  module.exports  = installChaincode;




  function buildChaincodeProposal(client,  chaincode_id, chaincode_path, version, type, targets) {
	let tx_id = client.newTransactionID();

	// send proposal to endorser
	const request = {
        targets:targets,
		chaincodePath: chaincode_path,
		chaincodeId: chaincode_id,
		chaincodeVersion: version,
		fcn: 'init',
		args: ['a', '100', 'b', '200'],
		txId: tx_id,
		chaincodeType: type,
		// use this to demonstrate the following policy:
		// 'if signed by org1 admin, then that's the only signature required,
		// but if that signature is missing, then the policy can also be fulfilled
		// when members (non-admin) from both orgs signed'
		'endorsement-policy': {
			identities: [
				{role: {name: 'member', mspId: 'DigibankMSP'}},
				{role: {name: 'admin', mspId: 'DigibankMSP'}}
			],
			policy: {
				'1-of': [
					{'signed-by': 1},
					{'signed-by': 0}
				]
			}
		}
	};
	return request;
}