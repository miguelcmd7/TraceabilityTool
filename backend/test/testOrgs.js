let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8080';


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

describe('Create a network',()=>{
    //req.body.name,req.body.orgId,req.body.ca_name,req.body.mspId,req.body.domain
    let org = {
        orgId:"org1",
        name:"Org1",
        ca_name:"orgCA",
        mspId:"orgMSP",
        domain:"miredseg.com"

    }

});