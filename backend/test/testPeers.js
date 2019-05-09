let chai = require('chai')
let chaiHttp = require('chai-http')
const expect = require('chai').expect;

chai.use(chaiHttp)

const url= 'http://localhost:8080';
let net ={
    directory:'/home/miguel/Hyperledger/ejemplo',
    domain:'miredseg.com',
    name:'Miredseg'
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
//req.body.id,req.body.orgId,req.body.domain,req.body.config
let config1 = {
    extPort:7050,
    intPort : 7050,
    extGossipPort : 7063 ,
    intGossipPort : 7063,
    anchor : true, 
    extra:''
}

let configWithOutElements = {
    extPort:7050,
}

let peer = {
    id : "peer1",
    orgId: "org1",
    config : config1
}

function newPeer(id, orgId, config){
    return{
        id : id,
        orgId: orgId,
        config : config
    }
}


describe('Testing Peers Backend',()=>{
    describe('Reseting..',()=>{

        it('should delete network', (done) => {
            chai.request(url)
                .delete('/network')
                .send()
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200)
                    //expect(res.body).to.have.property('domain').equal('mired.com')
                    done()
                })
        })
        it('should create a network', (done) => {
            chai.request(url)
                .post('/network')
                .send(net)
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('netDomain').equal('miredseg.com')
                    expect(res.body).to.have.property('netName').equal('Miredseg')
                    done()
                })
        })
        it('should create a org', (done) => {
            chai.request(url)
                .post('/orgs')
                .send(org)
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('domain').equal('org1.miredseg.com')
                    expect(res.body).to.have.property('orgName').equal('Org1')
                    expect(res.body).to.have.property('orgMSP').equal('orgMSP')
                    expect(res.body).to.have.property('orgId').equal('org1')
                    done()
                })
        })
        it('should create a org2', (done) => {
            chai.request(url)
                .post('/orgs')
                .send(org2)
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200)
                    done()
                })
        })
    
    })

    describe('Create Peer',()=>{
        
        it('should create a peer in org1', (done) => {

            chai.request(url)
                .post('/orgs/'+org.orgId+'/peers')
                .send(newPeer('peer1',org.orgId,config1))
                .end( function(err,res){
                        //  PeerId: this.id,
                        // PeerAllId:this.id +'.'+this.domain,
                        // Domain: this.domain,
                        // ExtPort: this.config.extPort,
                        // IntPort: this.config.intPort,
                        // ExtGossipPort: this.config.extGossipPort,
                        // IntGossipPort: this.config.intGossipPort,
                        // isAnchor: this.config.anchor,
                        // extra:this.config.extra
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('PeerId').equal(peer.id)
                    expect(res.body).to.have.property('Domain').equal('org1.miredseg.com')
                    expect(res.body).to.have.property('IntPort').equal(7050)
                    expect(res.body).to.have.property('IntGossipPort').equal(7063)
                    expect(res.body).to.have.property('ExtGossipPort').equal(7063)
                    expect(res.body).to.have.property('isAnchor').equal(true)
                    done()
                })
        })

        it('should fail create same peer', (done) => {
        
            chai.request(url)
                .post('/orgs/'+org.orgId+'/peers')
                .send(peer)
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(400)
                    done()
                })
        })
        
        it('should fail  create a peer in org not created', (done) => {

            chai.request(url)
                .post('/orgs/'+org.orgId+'/peers')
                .send(newPeer('peer1','asdf',config1))
                .end( function(err,res){
                    expect(res).to.have.status(404)
                    done()
                })
        })
        it('should fail  create a peer with wrong config', (done) => {

            chai.request(url)
                .post('/orgs/'+org.orgId+'/peers')
                .send(newPeer('peer2',org.orgId,{}))
                .end( function(err,res){
                    expect(res).to.have.status(400)
                    done()
                })
        })
        it('should fail  create another peer minumun config in org1', (done) => {

            chai.request(url)
                .post('/orgs/'+org.orgId+'/peers')
                .send(newPeer('peer2',org.orgId,configWithOutElements))
                .end( function(err,res){
                    expect(res.body).to.have.property('PeerId').equal('peer2')
                    expect(res.body).to.have.property('Domain').equal('org1.miredseg.com')
                    expect(res.body).to.have.property('IntPort').equal(7050)
                    expect(res.body).to.have.property('IntGossipPort').equal(7053)
                    expect(res.body).to.have.property('isAnchor').equal(false)
                    done()
                })
        })

    })

    describe('Getting Peers',()=>{
        it('should fail  get peer of unexisting org', (done) => {

            chai.request(url)
                .get('/orgs/'+'asdf'+'/peers/peer1')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(404)
                    done()
                })
        })
        it('should fail  get unexisting peer of  org', (done) => {

            chai.request(url)
                .get('/orgs/'+org.orgId+'/peers/peer3')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(404)
                    done()
                })
        })

        it('should   get  peer1 of  org', (done) => {
            chai.request(url)
                .get('/orgs/'+org.orgId+'/peers/peer1')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('PeerId').equal(peer.id)
                    expect(res.body).to.have.property('Domain').equal('org1.miredseg.com')
                    expect(res.body).to.have.property('IntPort').equal(7050)
                    expect(res.body).to.have.property('IntGossipPort').equal(7063)
                    expect(res.body).to.have.property('ExtGossipPort').equal(7063)
                    expect(res.body).to.have.property('isAnchor').equal(true)
                    done()
                })
        })
        it('should   get  peer2 of  org', (done) => {
            chai.request(url)
                .get('/orgs/'+org.orgId+'/peers/peer2')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('PeerId').equal('peer2')
                    expect(res.body).to.have.property('Domain').equal('org1.miredseg.com')
                    expect(res.body).to.have.property('IntPort').equal(7050)
                    expect(res.body).to.have.property('IntGossipPort').equal(7053)
                    expect(res.body).to.have.property('isAnchor').equal(false)
                    done()
                })
        })
        it('should  fails  get a created peer of other org', (done) => {
            chai.request(url)
                .get('/orgs/'+'org2'+'/peers/peer2')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(404)
                    done()
                })
        })

        it('should  return two peers from org1', (done) => {
        
            chai.request(url)
                .get('/orgs/'+org.orgId+'/peers')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('peers').length(2)
                    //expect(res.body).to.have.property('orgs')
                    done()
                })
                
        })
        it('should  return empty from org1', (done) => {
        
            chai.request(url)
                .get('/orgs/'+'org2'+'/peers')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('peers').length(0)
                    done()
                })
                
        })
        it('should  fail for unexisting org ', (done) => {
        
            chai.request(url)
                .get('/orgs/'+'aasdf'+'/peers')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(404)
                    done()
                })
                
        })
        it('should  return peers by orgs (two for org1 and 0 for org2) ', (done) => {
        
            chai.request(url)
                .get('/peers')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('orgs').length(2)
                    expect(res.body).to.have.nested.property('orgs[0]').to.have.property('peers').length(2)
                    expect(res.body).to.have.nested.property('orgs[0].peers[0].PeerId').equal(peer.id)
                    expect(res.body).to.have.nested.property('orgs[0].peers[0].Domain').equal('org1.miredseg.com')
                    expect(res.body).to.have.nested.property('orgs[0].peers[0].IntPort').equal(7050)
                    expect(res.body).to.have.nested.property('orgs[0].peers[0].IntGossipPort').equal(7063)
                    expect(res.body).to.have.nested.property('orgs[0].peers[0].ExtGossipPort').equal(7063)
                    expect(res.body).to.have.nested.property('orgs[0].peers[0].isAnchor').equal(true)

                    expect(res.body).to.have.nested.property('orgs[0].peers[1].PeerId').equal('peer2')
                    expect(res.body).to.have.nested.property('orgs[0].peers[1].Domain').equal('org1.miredseg.com')
                    expect(res.body).to.have.nested.property('orgs[0].peers[1].IntPort').equal(7050)
                    expect(res.body).to.have.nested.property('orgs[0].peers[1].IntGossipPort').equal(7053)
                    expect(res.body).to.have.nested.property('orgs[0].peers[1].isAnchor').equal(false)

                    expect(res.body).to.have.nested.property('orgs[1]').to.have.property('peers').length(0)
                    done()
                })
                
        })

    })
    describe('Updating  Peers',()=>{

        it('should fail update  peer1 unexisting  org', (done) => {
            //req.body.id,req.body-orgId,req.body.domain,req.body.config
            chai.request(url)
                .put('/orgs/'+'asdf'+'/peers/peer1')
                .send({config:config1})
                .end( function(err,res){
                    expect(res).to.have.status(404)
                    done()
                })
        })
        
        it('should fail update unknow peer of  org1', (done) => {
            //req.body.id,req.body-orgId,req.body.domain,req.body.config
            chai.request(url)
                .put('/orgs/'+org.orgId+'/peers/peer34')
                .send({config:config1})
                .end( function(err,res){
                    expect(res).to.have.status(404)
                    done()
                })
        })

        it('should   update  peer1 of  org', (done) => {
            //req.body.id,req.body-orgId,req.body.domain,req.body.config
            chai.request(url)
                .put('/orgs/'+org.orgId+'/peers/peer1')
                .send({config:configWithOutElements})
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('PeerId').equal(peer.id)
                    expect(res.body).to.have.property('Domain').equal('org1.miredseg.com')
                    expect(res.body).to.have.property('IntPort').equal(7050)
                    expect(res.body).to.have.property('IntGossipPort').equal(7053)
                    expect(res.body).to.have.property('isAnchor').equal(false)
                    done()
                })
        })
        it('should  get peer updated in org1 ', (done) => {
        
            chai.request(url)
                .get('/peers')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('orgs').length(2)
                    expect(res.body).to.have.nested.property('orgs[0]').to.have.property('peers').length(2)
                    expect(res.body).to.have.nested.property('orgs[0].peers[0].PeerId').equal(peer.id)
                    expect(res.body).to.have.nested.property('orgs[0].peers[0].Domain').equal('org1.miredseg.com')
                    expect(res.body).to.have.nested.property('orgs[0].peers[1].IntPort').equal(7050)
                    expect(res.body).to.have.nested.property('orgs[0].peers[1].IntGossipPort').equal(7053)
                    expect(res.body).to.have.nested.property('orgs[0].peers[1].isAnchor').equal(false)

                    expect(res.body).to.have.nested.property('orgs[0].peers[1].PeerId').equal('peer2')
                    expect(res.body).to.have.nested.property('orgs[0].peers[1].Domain').equal('org1.miredseg.com')
                    expect(res.body).to.have.nested.property('orgs[0].peers[1].IntPort').equal(7050)
                    expect(res.body).to.have.nested.property('orgs[0].peers[1].IntGossipPort').equal(7053)
                    expect(res.body).to.have.nested.property('orgs[0].peers[1].isAnchor').equal(false)

                    expect(res.body).to.have.nested.property('orgs[1]').to.have.property('peers').length(0)
                    done()
                })
                
        })


    })
    describe('Deleting  Peers',()=>{

        it('should fail deleting unknow org', (done) => {
            //req.body.id,req.body-orgId,req.body.domain,req.body.config
            chai.request(url)
                .delete('/orgs/'+'adsaf'+'/peers/peer1')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(404)
                    done()
                })
        })
        it('should fail deleting unknow peer', (done) => {
            //req.body.id,req.body-orgId,req.body.domain,req.body.config
            chai.request(url)
                .delete('/orgs/'+org.orgId+'/peers/peer36')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(404)
                    done()
                })
        })
        it('should delete  peer1', (done) => {
            //req.body.id,req.body-orgId,req.body.domain,req.body.config
            chai.request(url)
                .delete('/orgs/'+org.orgId+'/peers/peer1')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    done()
                })
        })
        it('should fail  get deleted peer1 of  org', (done) => {

            chai.request(url)
                .get('/orgs/'+org.orgId+'/peers/peer1')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(404)
                    done()
                })
        })
        it('should delete  peer2', (done) => {
            //req.body.id,req.body-orgId,req.body.domain,req.body.config
            chai.request(url)
                .delete('/orgs/'+org.orgId+'/peers/peer2')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    done()
                })
        })
        it('should  get 0 peers from orgs ', (done) => {
        
            chai.request(url)
                .get('/peers')
                .send()
                .end( function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('orgs').length(2)
                    expect(res.body).to.have.nested.property('orgs[0]').to.have.property('peers').length(0)

                    expect(res.body).to.have.nested.property('orgs[1]').to.have.property('peers').length(0)
                    done()
                })
                
        })


    })
})