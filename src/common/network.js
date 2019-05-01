let Organization = require('./organization');
let peerConf = require('../../lib/common/peerConfigGenerator');
let ordererConf = require('../../lib/common/ordererConfigGenerator');
let caConf = require('../../lib/common/caConfigGenerator');
class Network {
    /** 
     *@param {string} name 
     *@param {Map<string, Organization>} orgs
     * 
     * 
     * 
     * @param {string} domain
     **/

    constructor(name, domain) {
        if (!!Network.instance) {
            return Network.instance;
        }

        Network.instance = this;

        
        this.name = name;
        this.domain = domain;
        this.peers = new Map();
        this.peerByOrgs = new Map();
        this.orgs = new Map();
        this.orderers = new Map();
        this.channels = [];
        return this;
    
    }
    static getInstance(){
        if (!!Network.instance) {
            return Network.instance;
        }else
            return null
    }
    
    getName() {
        return this.name;
    }

    getDomain() {
        return this.domain;
    }
    getPeers() {
        return this.peers.values();

    }
    getPeer(peerId){
        return this.peers.get(peerId);
    }
    getPeersByOrg(){
        var json={}
        for ( [key, value] of this.peerByOrgs.entries()) {
            json.peerByOrgs = []
            var org = this.orgs.get(key).toJSON()
            org.peers = []
            // if (value != []){
            //     networkJson.peerByOrgs[key].peers=[]
            // }
            for (var peerInOrg of value) {
                var peer = this.peers.get(peerInOrg);

                org.peers.push(Object.assign(peer.toJSON(), peerConf(peer, Array.from(this.orderers.keys()))))
            }
            json.peerByOrgs.push(org);
        }
    }
    getOrgs(){
        return this.orgs.values()
    }
    getOrg(orgId){
        return this.orgs.get(orgId);
    }
    getOrderers() {
        return this.orderers.values();
    }
    getOrderer(ordererId){
        return this.orderers.get(ordererId);
    }
    getOrgsMsp(){
        let msps=[]
        for (let  org in this.orgs.values())
            msps.push(org.getMspId())
        return msps;
    }
    getChannels(){
        return this.channels;
    }
    getChannel(channelId){
        return this.channels.filter((value,index,array)=>{
            return value.getName()==channelId;
        });
    }
    getChannelOrgs(channel){
        let msps=[]
       
        for (let  orgId of channel.getOrgs()){
            msps.push(this.orgs.get(orgId).getMspId())
        }
        return msps;
    }

    setName(name){
        this.name=name;
    }

    addPeer(peer, orgId) {
        var peerid = peer.getAllId()

        if (this.peers.get(peerid) == null) {
            // console.log(this.)
            var orgPeers = this.peerByOrgs.get(orgId+'.'+this.domain);
            if(orgPeers != null){
                this.peers.set(peerid, peer)
            
                //console.log(orgPeers);
                orgPeers.push(peerid)
                this.peerByOrgs.set(orgId+'.'+this.domain, orgPeers);
                
            }else
                throw "Org not created"
            
        }else  
            throw "Peer already exists"

    }
    updatePeer(peerId,peerConf,anchor){
        peer=this.peers.get(peerId) 
        if(peer!=null){
            peer.setPeerConf(peerConf);
            return peer;
        }else{
            throw "Peer doesn't exist"
        }
    }
    deletePeer(peerId,orgId){
        peer=this.peers.get(peerId) 
        var isIn = false;
        if(peer!=null){           
            neworgs=this.peerByOrgs.get(orgId+'.'+this.domain).filter((value,index,array)=>{
                if (value != peerId)
                    return true;
                else{
                    isIn=true;
                    return false;
                } 
             })
            if (isIn){
                this.peerByOrgs.set(orgId+'.'+this.domain, neworgs)
                this.peers.delete(peerId);
            }else
                throw "That peer not belongs to this Org"
        }else{
            throw "Peer doesn't exist"
        }
    }

    //TODO Implementar exceptions, error al añadir existente.
    addOrg(org) {
        console.log('Adding ORG'+org.getAllId());
        this.orgs.set(org.getAllId(), org);
        this.peerByOrgs.set(org.getAllId(), [])

    }
    updateOrg(orgId,orgName,orgCa,orgMspId ){
        org=this.orgs.get(orgId);
        if (org==null)
            throw "Organization doesn't exist"
        else{
            org.setName(orgName);
            org.setCaName(orgCa);
            org.setMspId(orgMspId);
            return org;
        }
    }
    deleteOrg(orgId){
        if (this.orgs.delete(orgId)){
            peers = this.peerByOrgs.get(orgId)
            for (var peer of peers)
                this.peers.delete(peer);
            this.peerByOrgs.delete(orgId);
        }
        else
            throw "Organization doesn't exist"
    }

    addChannel(channel){
        if(!this.channels.includes(channel)){
            this.channels.push(channel);
        }

    }

    updateChannel(channelid){
        if(this.channels.includes(channel)){

        }else{
            throw "This channel doesn't exist"
        }

    }

    deleteChannel(channelName){

        this.channels = this.channels.filter((value,index,arra)=>{
            return value.getName() != channelName;
        })

    }
    addOrderer(orderer) {
        this.orderers.set(orderer.getId() + '.' + this.domain, orderer)
    }
    updateOrderer(ordererId, name, intPort,extPort,extra=''){
        var orderer = this.orderers.get(ordererId+'.'+this.domain);
        orderer.setName(name);
        orderer.setIntPort(intPort);
        orderer.setExtPort(extPort);
        orderer.setExtra(extra)

        return orderer;

    }
    deleteOrderer(ordererId){
        this.orderers.delete(ordererId+'.'+this.domain);
    }

    configtxJSON() {
        var configJson = {}
        configJson.ordererMSP = 'OrdererMSP'
        configJson.ordererMSPDIR = 'crypto-config/ordererOrganizations/' + this.domain + '/msp'
        configJson.orderers = []
        configJson.channels =[]
        configJson.orgs = []
        for (var [, value] of this.orderers.entries()) {
           // console.log(value)
            configJson.orderers.push(value.toJSON())
        }
        for (var channel of this.channels){
            var orgs=[]
            
            for (var orgId of channel.getOrgs()){
                
                orgs.push({orgName:this.orgs.get(orgId).getName()})
            }
            configJson.channels.push({channelName:channel.getName,orgs:orgs})
        }
        for( var org of this.orgs.values()){
            var anchoPeers=[];
            for(var peerId of this.peerByOrgs.get(org.getAllId())){
                var peer = this.peers.get(peerId)
        
                if(peer.isAnchor()){
                    anchoPeers.push(peer.toJSON());

                }
            }

            configJson.orgs.push(Object.assign(org.toJSON(),{anchoPeers:anchoPeers}));
        }
        return configJson;

    }

    cryptoJSON() {
        var networkJson = {}
        networkJson.netDomain = this.domain
        console.log(this.peerByOrgs.entries())
        console.log(this.orgs.entries());
        for ( [key, value] of this.peerByOrgs.entries()) {
            networkJson.peerByOrgs = []
            var org = this.orgs.get(key).toJSON()
            org.peers = []
            // if (value != []){
            //     networkJson.peerByOrgs[key].peers=[]
            // }
            for (var peerInOrg of value) {
                var peer = this.peers.get(peerInOrg);

                org.peers.push(peer.toJSON())
            }
            networkJson.peerByOrgs.push(org);
        }

        for (var [key, value] of this.orderers.entries()) {
            networkJson.orderers = []
           // console.log(value)
            networkJson.orderers.push(value.toJSON())
        }
        return networkJson;
    }

    toJSON() {
        var networkJson = {}
        networkJson.netName= this.name;
        networkJson.netDomain = this.domain
        networkJson.casByOrg = []
        networkJson.channels = this.channels;
        for ( [key, value] of this.orgs.entries()) {
            //console.log(value.getDomain());
            //console.log(map.get(key));

            //console.log(networkJson)
            networkJson.casByOrg.push(Object.assign(value.toJSON(), caConf(value.getDomain())))
        }

        for ( [key, value] of this.peerByOrgs.entries()) {
            networkJson.peerByOrgs = []
            var org = this.orgs.get(key).toJSON()
            org.peers = []
            // if (value != []){
            //     networkJson.peerByOrgs[key].peers=[]
            // }
            for (var peerInOrg of value) {
                var peer = this.peers.get(peerInOrg);

                org.peers.push(Object.assign(peer.toJSON(), peerConf(peer, Array.from(this.orderers.keys()))))
            }
            networkJson.peerByOrgs.push(org);
        }

        for (var [key, value] of this.orderers.entries()) {
            networkJson.orderers = []
           // console.log(value)
            networkJson.orderers.push(Object.assign(value.toJSON(), ordererConf(value, this.peers.values())))
        }

        // this.orgs.forEach(eachOrg);
        // this.peerByOrgs.forEach(OrgsPeer)
        // this.orderers.forEach(eachOrderer)



        return networkJson
    }

}
module.exports = Network;
