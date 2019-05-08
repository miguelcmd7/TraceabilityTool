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
                expect(res).to.have.status(400);
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
    it('should create a org2', (done) => {
        chai.request(url)
			.post('/orgs')
			.send(org2)
			.end( function(err,res){
				//console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('domain').equal(org2.orgId+'.'+net.domain)
                expect(res.body).to.have.property('orgName').equal(org2.name)
                expect(res.body).to.have.property('orgMSP').equal(org2.mspId)
                expect(res.body).to.have.property('orgId').equal(org2.orgId)
				done();
			});
    });
    it('should  return two orgs', (done) => {
       
        chai.request(url)
			.get('/orgs/')
			.send()
			.end( function(err,res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('orgs').length(2)
                //expect(res.body).to.have.property('orgs')
				done();
            });
            
    });
    
  });
  describe('Update org1',()=>{
    
    it('should  update with nothing return the same org', (done) => {
       // req.body.name,req.body.orgId,req.body.domain,req.body.config
        chai.request(url)
			.put('/orgs/'+org.orgId)
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
    it('should  update name', (done) => {
        // req.body.name,req.body.orgId,req.body.domain,req.body.config
         chai.request(url)
             .put('/orgs/'+org.orgId)
             .send({name:'OrgNew'})
             .end( function(err,res){
                 expect(res).to.have.status(200);
                 expect(res.body).to.have.property('domain').equal('org1.miredseg.com')
                 expect(res.body).to.have.property('orgName').equal('OrgNew')
                 expect(res.body).to.have.property('orgMSP').equal('orgMSP')
                 expect(res.body).to.have.property('orgId').equal('org1')
                 done();
             });
     });
     it('should  update MSP', (done) => {
        // req.body.name,req.body.orgId,req.body.domain,req.body.config
         chai.request(url)
             .put('/orgs/'+org.orgId)
             .send({mspId:'newMSP'})
             .end( function(err,res){
                 expect(res).to.have.status(200);
                 expect(res.body).to.have.property('domain').equal('org1.miredseg.com')
                 expect(res.body).to.have.property('orgName').equal('OrgNew')
                 expect(res.body).to.have.property('orgMSP').equal('newMSP')
                 expect(res.body).to.have.property('orgId').equal('org1')
                 done();
             });
     });
    
     it('should  get the org updated', (done) => {
       
        chai.request(url)
			.get('/orgs/'+org.orgId)
			.send()
			.end( function(err,res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('domain').equal('org1.miredseg.com')
                expect(res.body).to.have.property('orgName').equal('OrgNew')
                expect(res.body).to.have.property('orgMSP').equal('newMSP')
                expect(res.body).to.have.property('orgId').equal('org1')
				done();
			});
    });
    

  })
  describe('Deleting orgs',()=>{
    
    it('should  not delete org not found', (done) => {
       
        chai.request(url)
			.delete('/orgs/asdf')
			.send()
			.end( function(err,res){
                expect(res).to.have.status(404);
				done();
			});
    });
    
    it('should  delete org1', (done) => {
       
        chai.request(url)
			.delete('/orgs/'+org.orgId)
			.send()
			.end( function(err,res){
                expect(res).to.have.status(200);
				done();
			});
    });
    it('should  not get org deleted', (done) => {
       
        chai.request(url)
			.get('/orgs/'+org.orgId)
			.send()
			.end( function(err,res){
                expect(res).to.have.status(404);
				done();
			});
    });
    it('should  all orgs be 1', (done) => {
       
        chai.request(url)
			.get('/orgs/')
			.send()
			.end( function(err,res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('orgs').length(1)
				done();
			});
    });
    
    it('should create same org deleted', (done) => {

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

    it('should  delete org1 again', (done) => {
       
        chai.request(url)
			.delete('/orgs/'+org.orgId)
			.send()
			.end( function(err,res){
                expect(res).to.have.status(200);
				done();
			});
    });
    it('should   delete org2 ', (done) => {
       
        chai.request(url)
			.delete('/orgs/'+org2.orgId)
			.send()
			.end( function(err,res){
                expect(res).to.have.status(200);
				done();
			});
    });
    it('should  all orgs be 0', (done) => {
       
        chai.request(url)
			.get('/orgs/')
			.send()
			.end( function(err,res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('orgs').length(0)
				done();
			});
    });


  })
