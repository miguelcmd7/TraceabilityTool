const _ = require("./lib/util/util");
const fs = require("fs");
const path = require("path");
const { execSync, exec } = require("child_process");
const Client = require("fabric-client");
let signatures=[]
let config = null;
let orderer = null;

process.env.DEST_DIRECTORY = "/home/miguel/Hyperledger/ejemplo";

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

function getAdmin(client,  userOrg) {
	const keyPath = _([  "/crypto-config/peerOrganizations/digibank.mired.com/users/Admin@digibank.mired.com/msp/keystore"]);
	const keyPEM = Buffer.from(readAllFiles(keyPath)[0]).toString();
	const certPath = _([  "/crypto-config/peerOrganizations/digibank.mired.com/users/Admin@digibank.mired.com/msp/signcerts"]);
	const certPEM = readAllFiles(certPath)[0];

	const cryptoSuite = Client.newCryptoSuite();
	if (userOrg) {
		cryptoSuite.setCryptoKeyStore(Client.newCryptoKeyStore({path: module.exports.storePathForOrg(ORGS[userOrg].name)}));
		client.setCryptoSuite(cryptoSuite);
	}

	return Promise.resolve(client.createUser({
		username: 'peer' + userOrg + 'Admin',
		mspid: ORGS[userOrg].mspid,
		cryptoContent: {
			privateKeyPEM: keyPEM.toString(),
			signedCertPEM: certPEM.toString()
		}
	}));
}

function getOrdererAdmin(client) {
  const keyPath = _([
    "/crypto-config/ordererOrganizations/mired.com/users/Admin@mired.com/msp/keystore"
  ]);

  const keyPEM = Buffer.from(readAllFiles(keyPath)[0]).toString();
  const certPath = _([
    "/crypto-config/ordererOrganizations/mired.com/users/Admin@mired.com/msp/signcerts"
  ]);
  const certPEM = readAllFiles(certPath)[0];

  return Promise.resolve(
    client.createUser({
      username: "ordererAdmin",
      mspid: "OrdererMSP",
      cryptoContent: {
        privateKeyPEM: keyPEM.toString(),
        signedCertPEM: certPEM.toString()
      }
    })
  );
}

Client.addConfigFile(path.join(__dirname, "config.json"));

const client = new Client();

const keyPath = _([  "/crypto-config/peerOrganizations/digibank.mired.com/users/Admin@digibank.mired.com/msp/keystore"]);
const keyPEM = Buffer.from(readAllFiles(keyPath)[0]).toString();
const certPath = _([  "/crypto-config/peerOrganizations/digibank.mired.com/users/Admin@digibank.mired.com/msp/signcerts"]);
const certPEM = readAllFiles(certPath)[0];
//Client.newDefaultKeyValueStore({path: '/tmp/net-export/digibank'});
//Client.newDefaultKeyValueStore({path: '/tmp/net-export/digibank'})

Client.newDefaultKeyValueStore({ path: "/tmp/net-export/digibank" }).then(
  response => {
    client.setStateStore(response);
    const cryptoSuite = Client.newCryptoSuite();

    cryptoSuite.setCryptoKeyStore(
      Client.newCryptoKeyStore({ path: "/tmp/net-export/digibank" })
    );
    client.setCryptoSuite(cryptoSuite);

 getAdmin(client,"digibank")
      .then(() => {
        const envelope_bytes = fs.readFileSync(_(["config", "channel.tx"]));
         config = client.extractChannelConfig(envelope_bytes);
		
		let signature = client.signChannelConfig(config);
        signatures.push(signature);

        const data = fs.readFileSync(
          _([
            "/crypto-config/ordererOrganizations/mired.com/orderers/orderer.mired.com/tls/ca.crt"
          ])
        );
        const caroots = Buffer.from(data).toString();

         orderer = client.newOrderer("grpc://localhost:7050", {
          pem: caroots,
          "ssl-target-name-override": "orderer.mired.com"
		});
		 return getOrdererAdmin(client);
      }).then(()=>{
		  let signature = client.signChannelConfig(config);
		  signatures.push(signature);
		  const tx_id = client.newTransactionID();
			request = {
			config: config,
			signatures: signatures,
			name: 'mycc',
			orderer: orderer,
			txId: tx_id
			};
			return client.createChannel(request);
			
	  }).catch((err)=>{
		  console.log(err);
	  });
  }
);



//FIRMA EL ORDERER

//signature = client.signChannelConfig(config);
//t.pass("Successfully signed config update");

// collect signature from orderer org admin


//logger.debug("\n***\n done signing \n***\n");

// build up the create request


// send to create request to orderer

