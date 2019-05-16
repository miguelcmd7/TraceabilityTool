let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8080/channels';
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
function newPeer(id, orgId, config){
    return{
        id : id,
        orgId: orgId,
        config : config
    }
}

describe('Testing Organization Backend',()=>{
    describe('Reseting..',()=>{

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

        it('should create a org', (done) => {
            // orgName: this.name,
            //     domain: this.orgId+'.'+this.domain,
            //     cas: [{
            //         casId: this.ca_name,
            //         caName: this.ca_name
            //     }],
            //     orgId:this.orgId,
            //     orgMSP: this.mspId
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
        it('should create a peer1 in org1', (done) => {
    
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
                    expect(res.body).to.have.property('PeerId').equal('peer1')
                    expect(res.body).to.have.property('Domain').equal('org1.miredseg.com')
                    expect(res.body).to.have.property('IntPort').equal(7050)
                    expect(res.body).to.have.property('IntGossipPort').equal(7063)
                    expect(res.body).to.have.property('ExtGossipPort').equal(7063)
                    expect(res.body).to.have.property('isAnchor').equal(true)
                    done()
                })
        })
        it('should create a peer1 in org1', (done) => {
    
            chai.request(url)
                .post('/orgs/'+org.orgId+'/peers')
                .send(newPeer('peer2',org.orgId,config1))
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
                    expect(res.body).to.have.property('PeerId').equal('peer2')
                    expect(res.body).to.have.property('Domain').equal('org1.miredseg.com')
                    expect(res.body).to.have.property('IntPort').equal(7050)
                    expect(res.body).to.have.property('IntGossipPort').equal(7063)
                    expect(res.body).to.have.property('ExtGossipPort').equal(7063)
                    expect(res.body).to.have.property('isAnchor').equal(true)
                    done()
                })
        })

    });
    describe('Create Channel',()=>{
        
        it('should create a channel', (done) => {

            chai.request(url)
                .post('/channels/'+org.orgId+'/peers')
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
   
});