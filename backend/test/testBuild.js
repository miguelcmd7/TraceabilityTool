const requets = require('request');
const url= 'http://localhost:8080';
let net ={
    directory:'/home/miguel/Hyperledger/ejemplo',
    domain:'mired.com',
    name:'Mired'
}
let org = {
    orgId:"org1",
    name:"Org1",
    ca_name:"orgCA",
    mspId:"orgMSP"

}
let orderer = {
    //req.body.name,req.body.id,req.body.domain,req.body.extPort,req.body.extPort,req.body.intPort,req.body.extra
    name:"Orderer",
    id:"orderer",
    extPort:7051,
    intPort:7051
}

let peer = {
    id : "peer1",
    orgId: "org1",
    config : {
        extPort:7050,
        intPort : 7050,
        extGossipPort : 7063 ,
        intGossipPort : 7063,
        anchor : true, 
        extra:''
    }
}
let peer2 = {
    id : "peer2",
    orgId: "org1",
    config : {
        extPort:7060,
        intPort : 7050,
        extGossipPort : 7073 ,
        intGossipPort : 7063,
        anchor : true, 
        extra:''
    }
}

function newChannel(name,consortium,channelOrgs,orderers){
    return {
        name: name,
        consortium:consortium,
        orgs: channelOrgs,
        orderers : orderers

    }
}
function newChannelOrg(orgId,peers){
    return{
        orgId: orgId,
        peers:peers
    }
}

let channel1 = newChannel('mychannel','Sampleconsortium',[newChannelOrg(org.orgId,['peer1','peer2'])],[orderer.id]) 

requets.post(url+'/network',{ json: net})
requets.post(url+'/orgs',{json:org})
requets.post(url+'/orderers',{json:orderer})
requets.post(url+'/orgs/'+org.orgId+'/peers',{json:peer})
requets.post(url+'/orgs/'+org.orgId+'/peers',{json:peer2})
requets.post(url+'/channels',{json:channel1})
//requets.post(url+'/build')