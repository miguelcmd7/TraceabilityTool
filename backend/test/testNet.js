let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8080';

describe('Create a network',()=>{
    let net ={
        directory:'/home/miguel/Hyperledger/ejemplo',
        domain:'mired.com',
        name:'Mired'
    }


	it('should create a network', (done) => {
		chai.request(url)
			.post('/network')
			.send(net)
			.end( function(err,res){
				//console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('netDomain').equal('mired.com')
                expect(res.body).to.have.property('netName').equal('Mired')
				done();
			});
    });
    it('should return bad request', (done) =>{
        chai.request(url)
			.post('/network')
			.send({domian:''})
			.end( function(err,res){
				//console.log(res.body)
                expect(res).to.have.status(404);
				done();
			});
	})
	it('should error  creating a new network existing one', (done) => {
		chai.request(url)
			.post('/network')
			.send(net)
			.end( function(err,res){
				//console.log(res.body)
                expect(res).to.have.status(500);
				done();
			});
    });
});
describe('Get network domain',()=>{

    it('should return network domain', (done) => {
		chai.request(url)
			.get('/network')
			.send()
			.end( function(err,res){
				//console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('domain').equal('mired.com')
				done();
			});
    });

})
describe('Try deleting the network and recreating',()=>{
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
	it('get domain of network deled should error', (done) => {
		chai.request(url)
			.get('/network')
			.send()
			.end( function(err,res){
				console.log(res.body)
                expect(res).to.have.status(500);
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
	it('should return network domain', (done) => {
		chai.request(url)
			.get('/network')
			.send()
			.end( function(err,res){
				//console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('domain').equal('miredseg.com')
				done();
			});
    });

})