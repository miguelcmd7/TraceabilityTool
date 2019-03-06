let Organization = require('./organization');
let peerConf = require('../lib/common/peerConfigGenerator');
let ordererConf = require('../lib/common/ordererConfigGenerator');
let caConf = require('../lib/common/caConfigGenerator');
class Network {
    /** 
   *@param {string} name 
   *@param {Map<string, Organization>} orgs
   * 
   * 
   * 
   * @param {string} domain
   **/

   constructor(name,domain){
       this.name=name;
       this.domain=domain;
       this.peers= new Map();
       this.peerByOrgs= new Map();
       this.orgs = new  Map();
       this.orderers = new Map();
       this. channels = new Map();

   }

   getName(){
       return this.name;
   }

   getDomain(){
       return this.domain;
   }
   getPeers(){
       return this.peers.values();

   }
   getOrderers(){
       return this.orderers.values();
   }
   
   addPeer(peer,orgId){
    var peerid=peer.getAllId()   
    
    if (this.peers.get(peerid)==null){
            this.peers.set(peerid,peer)
            var orgPeers=this.peerByOrgs.get(orgId) ;
            console.log(orgPeers);
            orgPeers.push(peerid)
            this.peerByOrgs.set(orgId,orgPeers);            
        }

   } 

    //TODO Implementar exceptions, error al añadir existente.
   addOrg(org){
       this.orgs.set(org.getAllId(),org);
        this.peerByOrgs.set(org.getAllId(),[])
   }
   
   addOrderer(orderer){
       this.orderers.set(orderer.getId()+'.'+this.domain,orderer)
   } 

    configtxJSON(){
        var configJson= {}
        for (var [key,value] of  this.orderers.entries()){
            configJson.orderers=[]
            console.log(value)
            configJson.orderers.push( Object.assign(value.toJSON(),ordererConf(value)))
        }

    }


   toJSON(){
       var networkJson= {}
       networkJson.netDomain= this.domain
       networkJson.casByOrg=[]
       for (var [key,value] of  this.orgs.entries()){
        //console.log(value.getDomain());
        //console.log(map.get(key));

        //console.log(networkJson)
        networkJson.casByOrg.push(Object.assign(value.toJSON(),caConf(value.getDomain())))
        }
        
        for (var [key,value] of  this.peerByOrgs.entries()){
            networkJson.peerByOrgs=[]
            var org = this.orgs.get(key).toJSON()
            org.peers= []
            // if (value != []){
            //     networkJson.peerByOrgs[key].peers=[]
            // }
            for(var peerInOrg of value){
                var peer = this.peers.get(peerInOrg);

                org.peers.push(Object.assign(peer.toJSON(),peerConf(peer)))
            }
            networkJson.peerByOrgs.push(org);
        }
        
        for (var [key,value] of  this.orderers.entries()){
            networkJson.orderers=[]
            console.log(value)
            networkJson.orderers.push( Object.assign(value.toJSON(),ordererConf(value)))
        }
        
        // this.orgs.forEach(eachOrg);
        // this.peerByOrgs.forEach(OrgsPeer)
        // this.orderers.forEach(eachOrderer)
        
           
       
        return  networkJson
   }

}
module.exports=Network;