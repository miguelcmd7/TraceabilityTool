let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8080';
let net ={
    directory:'/home/miguel/Hyperledger/ejemplo',
    domain:'miredseg.com',
    name:'Miredseg'
}
let config1 = {
    extPort:7050,
    intPort : 7050,
    extGossipPort : 7063 ,
    intGossipPort : 7063,
    anchor : true, 
    extra:''
}
let org = {
    orgId:"org1",
    name:"Org1",
    ca_name:"orgCA",
    mspId:"orgMSP"

}
let org2 = {
    orgId:"org2",
    name:"Org2",
    ca_name:"org2CA",
    mspId:"org2MSP"

}
let orderer = {
    //req.body.name,req.body.id,req.body.domain,req.body.extPort,req.body.extPort,req.body.intPort,req.body.extra
    name:"Orderer",
    id:"orderer",
    extPort:7051,
    intPort:7051
}
function newPeer(id, orgId, config){
    return{
        id : id,
        orgId: orgId,
        config : config
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
let channelFailOrg = newChannel('mychannel2','Sampleconsortium',[newChannelOrg('NotORG',['peer1','peer2'])],[orderer.id]) 
let channel1FailPeer = newChannel('mychannel2','Sampleconsortium',[newChannelOrg(org.orgId,['peer1','peer25'])],[orderer.id]) 
let channel1FailOrdere = newChannel('mychannel2','Sampleconsortium',[newChannelOrg(org.orgId,['peer1','peer2'])],['oredrerrerrer']) 
let channel2 = newChannel('mychannel2','Sampleconsortium',[newChannelOrg(org.orgId,['peer1','peer2']),newChannelOrg(org2.orgId,['peer1','peer2'])],[orderer.id]) 
describe('Testing Organization Backend',()=>{
    describe('Reseting...',()=>{

        it('should delete network', (done) => {
            chai.request(url)
                .delete('/network')
                .send()
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    //expect(res.body).to.have.property('domain').equal('mired.com')
                    done();
                });
        });
        it('should create a network', (done) => {
            chai.request(url)
                .post('/network')
                .send(net)
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('netDomain').equal('miredseg.com')
                    expect(res.body).to.have.property('netName').equal('Miredseg')
                    done();
                });
        });

        it('should create  org1', (done) => {
            chai.request(url)
                .post('/orgs')
                .send(org)
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('domain').equal('org1.miredseg.com')
                    expect(res.body).to.have.property('orgName').equal('Org1')
                    expect(res.body).to.have.property('orgMSP').equal('orgMSP')
                    expect(res.body).to.have.property('orgId').equal('org1')
                    done();
                });
        });
        it('should create  org1', (done) => {
            chai.request(url)
                .post('/orgs')
                .send(org2)
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('domain').equal(org2.orgId+'.miredseg.com')
                    expect(res.body).to.have.property('orgName').equal(org2.name)
                    expect(res.body).to.have.property('orgMSP').equal(org2.mspId)
                    expect(res.body).to.have.property('orgId').equal(org2.orgId)
                    done();
                });
        });
        it('should create a peer1 in org1', (done) => {
    
            chai.request(url)
                .post('/orgs/'+org.orgId+'/peers')
                .send(newPeer('peer1',org.orgId,config1))
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('PeerId').equal('peer1')
                    expect(res.body).to.have.property('Domain').equal('org1.miredseg.com')
                    expect(res.body).to.have.property('IntPort').equal(7050)
                    expect(res.body).to.have.property('IntGossipPort').equal(7063)
                    expect(res.body).to.have.property('ExtGossipPort').equal(7063)
                    expect(res.body).to.have.property('isAnchor').equal(true)
                    done()
                })
        })
        it('should create a peer2 in org1', (done) => {
    
            chai.request(url)
                .post('/orgs/'+org.orgId+'/peers')
                .send(newPeer('peer2',org.orgId,config1))
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('PeerId').equal('peer2')
                    expect(res.body).to.have.property('Domain').equal('org1.miredseg.com')
                    expect(res.body).to.have.property('IntPort').equal(7050)
                    expect(res.body).to.have.property('IntGossipPort').equal(7063)
                    expect(res.body).to.have.property('ExtGossipPort').equal(7063)
                    expect(res.body).to.have.property('isAnchor').equal(true)
                    done()
                })
        })
        it('should create a peer1 in org2', (done) => {
    
            chai.request(url)
                .post('/orgs/'+org2.orgId+'/peers')
                .send(newPeer('peer1',org2.orgId,config1))
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('PeerId').equal('peer1')
                    expect(res.body).to.have.property('Domain').equal('org2.miredseg.com')
                    expect(res.body).to.have.property('IntPort').equal(7050)
                    expect(res.body).to.have.property('IntGossipPort').equal(7063)
                    expect(res.body).to.have.property('ExtGossipPort').equal(7063)
                    expect(res.body).to.have.property('isAnchor').equal(true)
                    done()
                })
        })
        it('should create a peer2 in org2', (done) => {
    
            chai.request(url)
                .post('/orgs/'+org2.orgId+'/peers')
                .send(newPeer('peer2',org2.orgId,config1))
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('PeerId').equal('peer2')
                    expect(res.body).to.have.property('Domain').equal('org2.miredseg.com')
                    expect(res.body).to.have.property('IntPort').equal(7050)
                    expect(res.body).to.have.property('IntGossipPort').equal(7063)
                    expect(res.body).to.have.property('ExtGossipPort').equal(7063)
                    expect(res.body).to.have.property('isAnchor').equal(true)
                    done()
                })
        })
        it('should create a orderer', (done) => {

            chai.request(url)
                .post('/orderers')
                .send(orderer)
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('ordererName').equal(orderer.name)
                    expect(res.body).to.have.property('ordererId').equal(orderer.id)
                    expect(res.body).to.have.property('domain').equal(net.domain)
                    expect(res.body).to.have.property('ExtPort').equal(orderer.extPort)
                    expect(res.body).to.have.property('IntPort').equal(orderer.intPort)
                    expect(res.body).to.have.property('extra').equal('')
                    done();
                });
        });


    });
    describe('Create Channel',()=>{
        
        it('should create a channel', (done) => {

            chai.request(url)
                .post('/channels')
                .send(channel1)
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    console.log(res.body)
                    expect(res.body).to.have.property('consortium').equal(channel1.consortium)
                    expect(res.body).to.have.property('name').equal(channel1.name)
                    done()
                })
        })
        it('should fail create same channel', (done) => {

            chai.request(url)
                .post('/channels')
                .send(channel1)
                .end( function(err,res){
                    expect(res).to.have.status(409)
                    done()
                })
        })
        it('should fail create  channel with no existing org', (done) => {

            chai.request(url)
                .post('/channels')
                .send(channelFailOrg)
                .end( function(err,res){
                    expect(res).to.have.status(404)
                    done()
                })
        })
        it('should fail create  channel  with no existing org peer', (done) => {

            chai.request(url)
                .post('/channels')
                .send(channel1FailPeer)
                .end( function(err,res){
                    expect(res).to.have.status(404)
                    done()
                })
        })
        it('should fail create same channel  with no existing orderer', (done) => {

            chai.request(url)
                .post('/channels')
                .send(channel1FailOrdere)
                .end( function(err,res){
                    expect(res).to.have.status(404)
                    done()
                })
        })

        it('should get size 1 getting all channels', (done) => {

            chai.request(url)
                .get('/channels')
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('channels').length(1)
                    expect(res.body).to.have.nested.property('channels[0].consortium').equal(channel1.consortium)
                    expect(res.body).to.have.nested.property('channels[0].name').equal(channel1.name)
                    // expect(res.body).to.have.nested.property('orderers[0].domain').equal(net.domain)
                    // expect(res.body).to.have.nested.property('orderers[0].ExtPort').equal(orderer.extPort)
                    // expect(res.body).to.have.nested.property('orderers[0].IntPort').equal(orderer.intPort)
                    // expect(res.body).to.have.nested.property('orderers[0].extra').equal('')
                    done()
                })
        })
        it('should create a channel', (done) => {

            chai.request(url)
                .post('/channels')
                .send(channel2)
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('consortium').equal(channel2.consortium)
                    expect(res.body).to.have.property('name').equal(channel2.name)
                    done()
                })
        })
        it('should get size 2 getting all channels', (done) => {

            chai.request(url)
                .get('/channels')
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('channels').length(2)
                    expect(res.body).to.have.nested.property('channels[0].consortium').equal(channel1.consortium)
                    expect(res.body).to.have.nested.property('channels[0].name').equal(channel1.name)
                    expect(res.body).to.have.nested.property('channels[1].consortium').equal(channel2.consortium)
                    expect(res.body).to.have.nested.property('channels[1].name').equal(channel2.name)
                    done()
                })
        })
    })
    describe('Getting Channels',()=>{
        it('should get channel1', (done) => {
            chai.request(url)
                .get('/channels/'+ channel1.name)
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('consortium').equal(channel1.consortium)
                    expect(res.body).to.have.property('name').equal(channel1.name)
                    done()
                })
        })
        it('should error not exiting channel channel1', (done) => {
            chai.request(url)
                .get('/channels/asdf')
                .end( function(err,res){
                    expect(res).to.have.status(404)
                    done()
                })
        })
        it('should get channel2', (done) => {
            chai.request(url)
                .get('/channels/'+ channel2.name)
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('consortium').equal(channel2.consortium)
                    expect(res.body).to.have.property('name').equal(channel2.name)
                    expect(res.body).to.have.property('peers').length(4)
                    expect(res.body).to.have.property('orgs').length(2)
                    done()
                })
        })
        
        
    })
    describe('Updating Channels',()=>{
        it('should get size 2 getting all channels', (done) => {

            chai.request(url)
                .get('/channels')
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    //console.log(res.body)
                    expect(res.body).to.have.property('channels').length(2)
                    expect(res.body).to.have.nested.property('channels[0].consortium').equal(channel1.consortium)
                    expect(res.body).to.have.nested.property('channels[0].name').equal(channel1.name)
                    expect(res.body).to.have.nested.property('channels[1].consortium').equal(channel2.consortium)
                    expect(res.body).to.have.nested.property('channels[1].name').equal(channel2.name)
                    done()
                })
        })
        it('should create a channel', (done) => {

            chai.request(url)
                .put('/channels/'+ channel2.name)
                .send(newChannel(channel2.name,'Sampleconsortium2',[newChannelOrg(org.orgId,['peer1']),newChannelOrg(org2.orgId,['peer1'])],[orderer.id]))
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('consortium').equal('Sampleconsortium2')
                    expect(res.body).to.have.property('name').equal(channel2.name)
                    expect(res.body).to.have.property('peers').length(2)
                    expect(res.body).to.have.property('orgs').length(2)
                    done()
                })
        })
        it('should get channel2', (done) => {
            chai.request(url)
                .get('/channels/'+ channel2.name)
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('consortium').equal('Sampleconsortium2')
                    expect(res.body).to.have.property('name').equal(channel2.name)
                    expect(res.body).to.have.property('peers').length(2)
                    expect(res.body).to.have.property('orgs').length(2)
                    done()
                })
        })
        it('should fail updating no existing channel', (done) => {

            chai.request(url)
                .put('/channels/'+ 'asdf')
                .send(newChannel('asdf','Sampleconsortium2',[newChannelOrg(org.orgId,['peer1']),newChannelOrg(org2.orgId,['peer1'])],[orderer.id]))
                .end( function(err,res){
                    expect(res).to.have.status(404)      
                    done()
                })
        })
        it('should undo the update', (done) => {

            chai.request(url)
                .put('/channels/'+ channel2.name)
                .send(newChannel(channel2.name,'Sampleconsortium2',[newChannelOrg(org.orgId,['peer1','peer2']),newChannelOrg(org2.orgId,['peer1','peer2'])],[orderer.id]))
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('consortium').equal('Sampleconsortium2')
                    expect(res.body).to.have.property('name').equal(channel2.name)
                    expect(res.body).to.have.property('peers').length(4)
                    expect(res.body).to.have.property('orgs').length(2)
                    done()
                })
        })
        
    })
    describe('Deleting',()=>{

        it('should delete  peer1 from org2', (done) => {
            //req.body.id,req.body-orgId,req.body.domain,req.body.config
            chai.request(url)
                .delete('/orgs/'+org2.orgId+'/peers/peer1')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    done()
                })
        })
        it('should get channel2', (done) => {
            chai.request(url)
                .get('/channels/'+ channel2.name)
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('consortium').equal('Sampleconsortium2')
                    expect(res.body).to.have.property('name').equal(channel2.name)
                    expect(res.body).to.have.property('peers').length(3)
                    expect(res.body).to.have.property('orgs').length(2)
                    done()
                })
        })
        it('should   delete org2 ', (done) => {
        
            chai.request(url)
                .delete('/orgs/'+org2.orgId)
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('should get channel2', (done) => {
            chai.request(url)
                .get('/channels/'+ channel2.name)
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('consortium').equal('Sampleconsortium2')
                    expect(res.body).to.have.property('name').equal(channel2.name)
                    expect(res.body).to.have.property('peers').length(2)
                    expect(res.body).to.have.property('orgs').length(1)
                    expect(res.body).to.have.property('orderers').length(1)
                    done()
                })
        })
        it('should  delete  orderer', (done) => {
            chai.request(url)
                .delete('/orderers/'+orderer.id)
                .send()
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('should get channel2', (done) => {
            chai.request(url)
                .get('/channels/'+ channel2.name)
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('consortium').equal('Sampleconsortium2')
                    expect(res.body).to.have.property('name').equal(channel2.name)
                    expect(res.body).to.have.property('peers').length(2)
                    expect(res.body).to.have.property('orgs').length(1)
                    expect(res.body).to.have.property('orderers').length(0)
                    done()
                })
        })
        it('should get channel1', (done) => {
            chai.request(url)
                .get('/channels/'+ channel1.name)
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('consortium').equal('Sampleconsortium')
                    expect(res.body).to.have.property('name').equal(channel1.name)
                    expect(res.body).to.have.property('peers').length(2)
                    expect(res.body).to.have.property('orgs').length(1)
                    expect(res.body).to.have.property('orderers').length(0)
                    done()
                })
        })
        it('should delete channel1', (done) => {
            chai.request(url)
                .delete('/channels/'+ channel1.name)
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    done()
                })
        })
        it('should get channel1', (done) => {
            chai.request(url)
                .get('/channels/'+ channel1.name)
                .end( function(err,res){
                    expect(res).to.have.status(404)
                    done()
                })
        })
    })
    
   
});