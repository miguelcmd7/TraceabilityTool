
const {readAllFiles,getAdmin,initClient,getCARoots,getPemPeer} = require('./chaincodeUtils');

async function queryChaincode (orgId, network, channel, chaincodeId,fcn,args){
    let client = await initClient(channel,orgId);
    let eventhubs =[];
    const channelReq =  client.newChannel(channel.getName());
  // console.log("Console path is "+chaincode_path);
    
    const targets = [];
    for (var peerId of channel.getPeers() ){
        if ( peerId.indexOf('peer1') > -1){
          //console.log(peerId)
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
            const eh = channelReq.newChannelEventHub(peer);
					  eventhubs.push(eh);
        }
      }
    await getAdmin(client,network.getOrg(orgId))
    
    const request = {
        chaincodeId : chaincodeId,
        fcn: fcn,
        args: args,
        request_timeout: 3000
    };

    //let response = await client.installChaincode(request);
     console.log("Query chaincode");
    // console.log(response[0]);
    let response =  await channelReq.queryByChaincode(request);
    console.log("Query response:");
    console.log(response[0]);
   return response
    // let tx_id = request2.txId;

    
    
  }

  module.exports = queryChaincode;

  //docker exec -e "CORE_PEER_LOCALMSPID=DigibankMSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@digibank.mired.com/msp" peer1.digibank.mired.com peer chaincode instantiate -o orderer.mired.com:7060 -C mycc -n newchaincode -v 1.0 -c '{"Args":["Init"]}'

  //docker exec -e "CORE_PEER_LOCALMSPID=DigibankMSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@digibank.mired.com/msp" peer2.digibank.mired.com peer chaincode list --instantiated -C mycc