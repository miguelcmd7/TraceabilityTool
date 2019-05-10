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

let orderer = {
    //req.body.name,req.body.id,req.body.domain,req.body.extPort,req.body.extPort,req.body.intPort,req.body.extra
    name:"Orderer",
    id:"orderer",
    extPort:7051,
    intPort:7051
}
let ordererMinimun = {
    //req.body.name,req.body.id,req.body.domain,req.body.extPort,req.body.extPort,req.body.intPort,req.body.extra
    name:"Orderer",
    id:"orderer2",
    extPort:7051,
}
let ordererFail = {
    //req.body.name,req.body.id,req.body.domain,req.body.extPort,req.body.extPort,req.body.intPort,req.body.extra
    name:"Orderer",
    id:"orderer",
    intPort:7051,
}
let orderupdate={
    name:"orderNuevo",
    intPort:8050,
    extPort : 6060,
    extra :"extra"
}

describe('Testing Orderer Backend',()=>{
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
    });
    describe('Create org',()=>{
        

        it('should create a orderer', (done) => {
            // ordererName:this.name,
            // ordererId: this.id,
            // domain: this.domain,
            // ExtPort: this.extPort,
            // IntPort: this.intPort,
            // extra: this.extra
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

        it('should fail create same orderer', (done) => {
        
            chai.request(url)
                .post('/orderers')
                .send(orderer)
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(409);
                    done();
                });
        });
        
        it('should fail create orderer with wrong parameters', (done) => {
        
            chai.request(url)
                .post('/orderers')
                .send(ordererFail)
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(400);
                    done();
                });
        });
        
        it('should fail create ordereer without parameters', (done) => {
        
            chai.request(url)
                .post('/orderers')
                .send()
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(400);
                    done();
                });
        });
        it('should create a orderer', (done) => {
            // ordererName:this.name,
            // ordererId: this.id,
            // domain: this.domain,
            // ExtPort: this.extPort,
            // IntPort: this.intPort,
            // extra: this.extra
            chai.request(url)
                .post('/orderers')
                .send(ordererMinimun)
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('ordererName').equal(ordererMinimun.name)
                    expect(res.body).to.have.property('ordererId').equal(ordererMinimun.id)
                    expect(res.body).to.have.property('domain').equal(net.domain)
                    expect(res.body).to.have.property('ExtPort').equal(ordererMinimun.extPort)
                    expect(res.body).to.have.property('IntPort').equal(7051)
                    expect(res.body).to.have.property('extra').equal('')
                    done();
                });
        });

    });
    describe('Get ordereres',()=>{
        it('should get a orderer', (done) => {
            // ordererName:this.name,
            // ordererId: this.id,
            // domain: this.domain,
            // ExtPort: this.extPort,
            // IntPort: this.intPort,
            // extra: this.extra
            chai.request(url)
                .get('/orderers/'+ordererMinimun.id)
                .send()
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('ordererName').equal(ordererMinimun.name)
                    expect(res.body).to.have.property('ordererId').equal(ordererMinimun.id)
                    expect(res.body).to.have.property('domain').equal(net.domain)
                    expect(res.body).to.have.property('ExtPort').equal(ordererMinimun.extPort)
                    expect(res.body).to.have.property('IntPort').equal(7051)
                    expect(res.body).to.have.property('extra').equal('')
                    done();
                });
        });
        it('should get another orderer', (done) => {
            chai.request(url)
                .get('/orderers/'+orderer.id)
                .send()
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
        it('should fail unknow orderer', (done) => {
            chai.request(url)
                .get('/orderers/asdf')
                .send()
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(404);
                    done();
                });
        });
        it('should return all orderers', (done) => {
            chai.request(url)
                .get('/orderers')
                .send()
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('orderers').length(2)
                    expect(res.body).to.have.nested.property('orderers[0].ordererName').equal(orderer.name)
                    expect(res.body).to.have.nested.property('orderers[0].ordererId').equal(orderer.id)
                    expect(res.body).to.have.nested.property('orderers[0].domain').equal(net.domain)
                    expect(res.body).to.have.nested.property('orderers[0].ExtPort').equal(orderer.extPort)
                    expect(res.body).to.have.nested.property('orderers[0].IntPort').equal(orderer.intPort)
                    expect(res.body).to.have.nested.property('orderers[0].extra').equal('')

                    expect(res.body).to.have.nested.property('orderers[1].ordererName').equal(ordererMinimun.name)
                    expect(res.body).to.have.nested.property('orderers[1].ordererId').equal(ordererMinimun.id)
                    expect(res.body).to.have.nested.property('orderers[1].domain').equal(net.domain)
                    expect(res.body).to.have.nested.property('orderers[1].ExtPort').equal(ordererMinimun.extPort)
                    expect(res.body).to.have.nested.property('orderers[1].IntPort').equal(7051)
                    expect(res.body).to.have.nested.property('orderers[1].extra').equal('')

                    done();
                });
        });

    })

    describe('Update ordereres',()=>{
        //req.body.name,req.body.intPort,req.body.extPort,req.body.extra

        it('should fail update unknow orderer', (done) => {
            chai.request(url)
                .put('/orderers/asdf')
                .send()
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(404);
                    done();
                });
        });
        
        it('should  update  orderer', (done) => {
            chai.request(url)
                .put('/orderers/'+orderer.id)
                .send(orderupdate)
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('ordererName').equal(orderupdate.name)
                    expect(res.body).to.have.property('ordererId').equal(orderer.id)
                    expect(res.body).to.have.property('domain').equal(net.domain)
                    expect(res.body).to.have.property('ExtPort').equal(orderupdate.extPort)
                    expect(res.body).to.have.property('IntPort').equal(orderupdate.intPort)
                    expect(res.body).to.have.property('extra').equal(orderupdate.extra)
                    done();
                });
        });

        it('should  get updated  orderer', (done) => {
            chai.request(url)
                .get('/orderers/'+orderer.id)
                .send(orderupdate)
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('ordererName').equal(orderupdate.name)
                    expect(res.body).to.have.property('ordererId').equal(orderer.id)
                    expect(res.body).to.have.property('domain').equal(net.domain)
                    expect(res.body).to.have.property('ExtPort').equal(orderupdate.extPort)
                    expect(res.body).to.have.property('IntPort').equal(orderupdate.intPort)
                    expect(res.body).to.have.property('extra').equal(orderupdate.extra)
                    done();
                });
        });

        it('should return orderers updated', (done) => {
            chai.request(url)
                .get('/orderers')
                .send()
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('orderers').length(2)
                    expect(res.body).to.have.nested.property('orderers[0].ordererName').equal(orderupdate.name)
                    expect(res.body).to.have.nested.property('orderers[0].ordererId').equal(orderer.id)
                    expect(res.body).to.have.nested.property('orderers[0].domain').equal(net.domain)
                    expect(res.body).to.have.nested.property('orderers[0].ExtPort').equal(orderupdate.extPort)
                    expect(res.body).to.have.nested.property('orderers[0].IntPort').equal(orderupdate.intPort)
                    expect(res.body).to.have.nested.property('orderers[0].extra').equal(orderupdate.extra)

                    expect(res.body).to.have.nested.property('orderers[1].ordererName').equal(ordererMinimun.name)
                    expect(res.body).to.have.nested.property('orderers[1].ordererId').equal(ordererMinimun.id)
                    expect(res.body).to.have.nested.property('orderers[1].domain').equal(net.domain)
                    expect(res.body).to.have.nested.property('orderers[1].ExtPort').equal(ordererMinimun.extPort)
                    expect(res.body).to.have.nested.property('orderers[1].IntPort').equal(7051)
                    expect(res.body).to.have.nested.property('orderers[1].extra').equal('')

                    done();
                });
        });



    })
    describe('Deleting ordereres',()=>{

        it('should fail delete unknow orderer', (done) => {
            chai.request(url)
                .put('/orderers/asdf')
                .send()
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(404);
                    done();
                });
        });
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
        it('should fail delete same orderer', (done) => {
            chai.request(url)
                .delete('/orderers/'+orderer.id)
                .send()
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(404);
                    done();
                });
        });
        
        it('should fail geting  deleted orderer', (done) => {
            chai.request(url)
                .get('/orderers/'+orderer.id)
                .send()
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(404);
                    
                    done();
                });
        });
        it('should return all orderers', (done) => {
            chai.request(url)
                .get('/orderers')
                .send()
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('orderers').length(1)
            
                    expect(res.body).to.have.nested.property('orderers[0].ordererName').equal(ordererMinimun.name)
                    expect(res.body).to.have.nested.property('orderers[0].ordererId').equal(ordererMinimun.id)
                    expect(res.body).to.have.nested.property('orderers[0].domain').equal(net.domain)
                    expect(res.body).to.have.nested.property('orderers[0].ExtPort').equal(ordererMinimun.extPort)
                    expect(res.body).to.have.nested.property('orderers[0].IntPort').equal(7051)
                    expect(res.body).to.have.nested.property('orderers[0].extra').equal('')

                    done();
                });
        });
        it('should create  orderer deleted', (done) => {
            // ordererName:this.name,
            // ordererId: this.id,
            // domain: this.domain,
            // ExtPort: this.extPort,
            // IntPort: this.intPort,
            // extra: this.extra
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
        it('should get orderer previous deleted and recreated', (done) => {
            chai.request(url)
                .get('/orderers/'+orderer.id)
                .send()
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
        it('should  delete another orderer', (done) => {
            chai.request(url)
                .delete('/orderers/'+ordererMinimun.id)
                .send()
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('should return 0 orderers', (done) => {
            chai.request(url)
                .get('/orderers')
                .send()
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('orderers').length(0)


                    done();
                });
        });
        

    })

})