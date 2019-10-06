const requets = require('request');
const url= 'http://localhost:8080';
let net ={
    directory:'/home/miguel/Hyperledger/ejemplo',
    domain:'mired.com',
    name:'myred'
}
let org = {
    orgId:"digibank",
    name:"Digibank",
    ca_name:"digiCA",
    mspId:"DigibankMSP"

}
let orderer = {
    //req.body.name,req.body.id,req.body.domain,req.body.extPort,req.body.extPort,req.body.intPort,req.body.extra
    name:"Orderer",
    id:"orderer",
    extPort:5247,
    intPort:7060
}

let peer = {
    id : "peer1",
    orgId: "digibank",
    config : {
        extPort:7060,
        intPort : 7051,
        extGossipPort : 7063 ,
        intGossipPort : 7063,
        anchor : true, 
        extra:''
    }
}
let peer2 = {
    id : "peer2",
    orgId: "digibank",
    config : {
        extPort:7070,
        intPort : 7051,
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

let channel1 = newChannel('mycc','SampleConsortium',[newChannelOrg(org.orgId,['peer1','peer2'])],[orderer.id]) 

requets.post(url+'/network',{ json: net})
requets.post(url+'/orgs',{json:org})
requets.post(url+'/orderers',{json:orderer})
requets.post(url+'/orgs/'+org.orgId+'/peers',{json:peer})
requets.post(url+'/orgs/'+org.orgId+'/peers',{json:peer2})
requets.post(url+'/channels',{json:channel1})
//requets.post(url+'/build')