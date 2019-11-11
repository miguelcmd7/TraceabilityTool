let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8080';
chai.request(url)
				.delete('/network')
				.send()
				.end( function(err,res){
					//console.log(res.body)
					expect(res).to.have.status(200);
					//expect(res.body).to.have.property('domain').equal('mired.com')
					
                });