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
const {readAllFiles,getAdmin,initClient,getCARoots,getPemPeer} = require('./chaincodeUtils');

async function invokeChaincode (orgId, network, channel, chaincodeId,fcn,args){
    return new Promise(async(resolve,reject)=>{ 
        let client = await initClient(channel,orgId);
        let eventhubs =[];
        const channelReq =  client.newChannel(channel.getName());
      //console.log("Console path is "+chaincode_path);
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
            if ( peerId.indexOf('peer1') > -1){
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
                const eh = channelReq.newChannelEventHub(peerReq);
                eventhubs.push(eh);
            }
          }
        await getAdmin(client,network.getOrg(orgId))
        const request2 = {
            chaincodeId : chaincodeId,
            fcn: fcn,
            args: args,
            txId:  client.newTransactionID(),
        };

        //let response = await client.installChaincode(request);
        // console.log("Respondiendo...");
        // console.log(response[0]);
        let response;

        let tx_id = request2.txId;
        await setTimeout(async (data)=>{
        console.log("Enviando propuesta invoke...")
        response =await channelReq.sendTransactionProposal(request2);
            
        console.log(response);
          const proposalResponses = response[0];
          const proposal = response[1];
          tx_id = request2.txId;
         let  request3 = {
            proposalResponses: proposalResponses,
            proposal: proposal
          };
          
          const deployId = tx_id.getTransactionID();
		  const eventPromises = [];
		  eventPromises.push(channelReq.sendTransaction(request3));

          eventhubs.forEach((eh) => {
            const txPromise = new Promise((resolve, reject) => {
              const handle = setTimeout(() => {
                console.log('Timeout - Failed to receive the event for instantiate:  waiting on ' + eh.getPeerAddr());
                eh.disconnect();
                reject('TIMEOUT waiting on ' + eh.getPeerAddr());
              }, 120000);
    
              eh.registerTxEvent(deployId.toString(), (tx, code) => {
                console.log('The chaincode '  + ' transaction has been committed on peer ' + eh.getPeerAddr());
                clearTimeout(handle);
                if (code !== 'VALID') {
                  console.log('The chaincode ' + ' transaction was invalid, code = ' + code);
                  reject();
                } else {
                  console.log('The chaincode ' + ' transaction was valid.');
                  resolve();
                }
              }, (err) => {
                console.log('There was a problem with the instantiate event ' + err);
                clearTimeout(handle);
                reject();
              }, {
                disconnect: true
              });
              eh.connect();
            });
            console.log('register eventhub %s with tx=%s', eh.getPeerAddr(), deployId);
            eventPromises.push(txPromise);
          });
          let definitiva= await Promise.all(eventPromises);
          console.log("Respuesta intancia chaincode")
          console.log(definitiva)
          resolve()
          },
        10000);
    });
    
  }

  module.exports = invokeChaincode;