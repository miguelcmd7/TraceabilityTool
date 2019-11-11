const NUM_OF_ORGS = 80
const NUM_OF_PEERS = 80


let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8080';

let net ={
    directory:'/home/miguel/Hyperledger/ejemploBackend',
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

let org = {
    orgId:"org",
    name:"Org",
    ca_name:"orgCA",
    mspId:"orgMSP"

}
let config1 = {
    extPort:7050,
    intPort : 7050,
    extGossipPort : 7063 ,
    intGossipPort : 7063,
    anchor : true, 
    extra:''
}

function newPeer(id, orgId, config){
    return{
        id : id,
        orgId: orgId,
        config : config
    }
}
// chai.request(url)
// 				.delete('/network')
// 				.send()
// 				.end( function(err,res){
// 					//console.log(res.body)
// 					expect(res).to.have.status(200);
// 					//expect(res.body).to.have.property('domain').equal('mired.com')
					
//                 });

chai.request(url)
                .post('/network')
                .send(net)
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200)
                    
                });

chai.request(url)
                .post('/orderers')
                .send(orderer)
                .end( function(err,res){
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    
                });
for(let org_index = 0; org_index<NUM_OF_ORGS; org_index++ ){

        
            org.orgId='org'+org_index
            //it('should create '+org.orgId, (done) => {
                chai.request(url)
                            .post('/orgs')
                            .send(org)
                            .end( function(err,res){
                                //console.log(res.body)
                                expect(res).to.have.status(200);
                                for(let peer_index = 0;peer_index<NUM_OF_PEERS;peer_index++ ){
                                    //it('should create peer'+peer_index +'for Org ' +org.orgId, (done) => {
                                        chai.request(url)
                                        .post('/orgs/'+'org'+org_index+'/peers')
                                        .send(newPeer('peer'+peer_index,'org'+org_index,config1))
                                        .end( function(err,res){
                
                                            expect(res).to.have.status(200)
                                         //   done();
                                        })
                                    //})
                                }
                            });
                       // })
               // console.log('creada Org :'+org.orgId)
                
            
        

}
// while(1){
//     setTimeout(()=>{
//        try {
        chai.request(url)
        .post('/build')
        .send()
        .end( function(err,res){
            //console.log(res.body)
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('code').equal(3);
           
        }); 
//        } catch (error) {
//            console.log('Todavia No ')
//        }
     
//     }

//         ,10)
    
// }

                
