let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8080';

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

before(function() {
    let net ={
        directory:'/home/miguel/Hyperledger/ejemplo',
        domain:'miredseg.com',
        name:'Miredseg'
    }
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
  });

describe('Create org',()=>{
    //req.body.name,req.body.orgId,req.body.ca_name,req.body.mspId,req.body.domain

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

    it('should fail create same org', (done) => {
       
        chai.request(url)
			.post('/orgs')
			.send(org)
			.end( function(err,res){
				//console.log(res.body)
                expect(res).to.have.status(500);
				done();
			});
    });
    it('should fail create org without parameters', (done) => {
       
        chai.request(url)
			.post('/orgs')
			.send()
			.end( function(err,res){
				//console.log(res.body)
                expect(res).to.have.status(400);
				done();
			});
    });

  });
  describe('Get org',()=>{
    it('should  get the org', (done) => {
       
        chai.request(url)
			.get('/orgs/'+org.orgId)
			.send()
			.end( function(err,res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('domain').equal('org1.miredseg.com')
                expect(res.body).to.have.property('orgName').equal('Org1')
                expect(res.body).to.have.property('orgMSP').equal('orgMSP')
                expect(res.body).to.have.property('orgId').equal('org1')
				done();
			});
    });
    
    it('should  fails not found', (done) => {
       
        chai.request(url)
			.get('/orgs/asdf')
			.send()
			.end( function(err,res){
                expect(res).to.have.status(404);
				done();
            });
            
    });
    
  });

