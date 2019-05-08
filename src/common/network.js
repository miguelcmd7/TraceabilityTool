const Organization = require('./organization');
const Peer = require('./peer');
const Orderer= require('./orderer');
const Channel = require('./channel');
const PeerConf = require('./peerConf')
let peerConf = require('../../lib/common/peerConfigGenerator');
let ordererConf = require('../../lib/common/ordererConfigGenerator');
let caConf = require('../../lib/common/caConfigGenerator');
const ErrorWithCode = require('../../lib/error/error')
class Network {
    /** 
     *@param {string} name 
     * @param {string} domain
     * @returns {Network}
     **/

    constructor(name, domain) {
        if (!!Network.instance) {
            return Network.instance;
        }

        Network.instance = this;
        this.name = name;
        this.domain = domain;
        
        /**
         * @type {Map<string,Peer>} 
         */
        this.peers = new Map();
        
        /**
         * @type {Map<string,string>} 
         */
        this.peerByOrgs = new Map();
        
        /**
         * @type {Map<string,Organization>} 
         */
        this.orgs = new Map();
        
        /**
         * @type {Map<string,Orderer>} 
         */
        this.orderers = new Map();
        
        /**
         * @type {Channel[]} 
         */
        this.channels = [];
        
        return this;
    }
    /**
     * @returns {Network}
     */
    static getInstance(){
        if (!!Network.instance) {
            return Network.instance;
        }else
            return null
    }

    static deleteInstance(){
        if(!!Network.instance){
            Network.instance.clean()
            Network.instance=null
        }
        return true
        

    }

    createError(number, message){
        return new ErrorWithCode(number,message)
    }
    clean(){
        this.peers.clear()
        this.peerByOrgs.clear()
        this.orgs.clear()
        this.orderers.clear()
    }

    /**
     * @returns {string} name
     */
    getName() {
        return this.name;
    }

    /**
     * @returns {string} 
     */
    getDomain() {
        return this.domain;
    }

    /**
     * @returns {Peer[]} 
     */
    getPeers() {
        return this.peers.values();

    }
    
    /**
     * @returns {Organization[]} 
     */
    getAllOrgs(){
        return this.orgs.values();
    }

    /**
     *  @param {string} peerId
     * @returns {Peer} 
     */
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

    /**
     * @returns {Organization[]} 
     */
    getOrgs(){
        return this.orgs.values()
    }

    /**
     * @param {string} orgId
     * @returns {Organization} 
     */
    getOrg(orgId){
        let org = this.orgs.get(orgId)
        if (org!=null)
              return org;
        else {
            throw this.createError(404,"Organization "+orgId+' not found')
        }
    }

    /**
     * @returns {Orderer[]} 
     */
    getOrderers() {
        return this.orderers.values();
    }
    
    /**
     * @returns {Orderer} 
     */
    getOrderer(ordererId){
        return this.orderers.get(ordererId);
    }

    getOrgsMsp(){
        let msps=[]
        for (let  org in this.orgs.values())
            msps.push(org.getMspId())
        return msps;
    }
    
    /**
     * @returns {Channel[]}
     */
    getChannels(){
        return this.channels;
    }
    /**
     * 
     * @param {string} channelId 
     * @returns {Channel}
     */
    getChannel(channelId){
        return this.channels.find((value)=>{
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

    /**
     * 
     * @param {string} name 
     */
    setName(name){
        this.name=name;
    }

    /**
     * 
     * @param {Peer} peer 
     * @param {string} orgId 
     */
    addPeer(peer, orgId) {
        var peerid = peer.getAllId()

        if (this.peers.get(peerid) == null) {
            // console.log(this.)
            var orgPeers = this.peerByOrgs.get(orgId);
            if(orgPeers != null){
                this.peers.set(peerid, peer)
            
                //console.log(orgPeers);
                orgPeers.push(peerid)
                this.peerByOrgs.set(orgId, orgPeers);
                return peer;
            }else
            throw this.createError(404, "Org "+orgId+" not created")
            
        }else  
            throw this.createError(400, "Peer "+peer.getAllId()+" already exists")

    }

    /**
     * 
     * @param {string} peerAllId 
     * @param {PeerConf} peerConf 
     */
    updatePeer(peerAllId,peerConf){
        let peer=this.peers.get(peerAllId) 
        if(peer!=null){
            peer.setPeerConf(peerConf);
            return peer;
        }else{
            throw this.createError(404, "Peer "+peerId+" doesn't exist")
        }
    }

    /**
     * 
     * @param {string} peerId 
     * @param {string} orgId 
     */
    deletePeer(peerId,orgId){
        let peer=this.peers.get(peerId) 
        var isIn = false;
        let org = this.orgs.get(orgId);
        if (org!=null)
            if(peer!=null){           
                let neworgs=this.peerByOrgs.get(orgId).filter((value,index,array)=>{
                    if (value != peerId)
                        return true;
                    else{
                        isIn=true;
                        return false;
                    } 
                })
                if (isIn){
                    this.peerByOrgs.set(orgId, neworgs)
                    this.peers.delete(peerId);
                }else
                    throw this.createError(400,"That peer "+peerId+ " not belongs to this Org "+orgId)
            }else{
                throw this.createError(404,"Peer "+peerId+ "doesn't exist")
            }
        else
            throw this.createError(404,"Org "+orgId+ "doesn't exist")
    }

    
    /**
     * 
     * @param {Organization} org 
     */
    addOrg(org) {
        if (this.orgs.get(org.getAllId())==null){
            this.orgs.set(org.getAllId(), org);
            this.peerByOrgs.set(org.getAllId(), [])
        }else{
            throw this.createError(400, "Org "+org.getAllId()+"  Already exist")
        }
       

    }

    /**
     * 
     * @param {string} orgId 
     * @param {string} orgName 
     * @param {string} orgCa 
     * @param {string} orgMspId 
     */
    updateOrg(orgId,orgName,orgCa,orgMspId ){
        let org=this.orgs.get(orgId);
        if (org==null)
            throw this.createError(404,"Org "+orgId+ "doesn't exist")
        else{
            if (orgName != null && orgName != '')
                org.setName(orgName);
            if (orgCa != null && orgCa != '')
                 org.setCaName(orgCa);
            if (orgMspId != null && orgMspId != '')
                org.setMspId(orgMspId);
            return org;
        }
    }
    /**
     * 
     * @param {string} orgId 
     */
    deleteOrg(orgId){

        if (this.orgs.get(orgId)!=null){
            let peers = this.peerByOrgs.get(orgId)
            for (var peerId of peers)
                this.peers.delete(peerId);
            this.peerByOrgs.delete(orgId);
            this.orgs.delete(orgId)
        }
        else
            throw this.createError(404, "Organization "+orgId+"doesn't exist")
    }

    /**
     * 
     * @param {Channel} channel 
     */
    addChannel(channel){
        if(!this.channels.includes(channel)){
            this.channels.push(channel);
        }

    }
    /**
     * 
     * @param {string} channelid 
     */
    updateChannel(channelid){
        if(this.channels.includes(channel)){

        }else{
            throw "This channel doesn't exist"
        }

    }

    /**
     * 
     * @param {string} channelName 
     */
    deleteChannel(channelName){

        this.channels = this.channels.filter((value,index,arra)=>{
            return value.getName() != channelName;
        })

    }

    /**
     * 
     * @param {Orderer} orderer 
     */
    addOrderer(orderer) {
        this.orderers.set(orderer.getId() + '.' + this.domain, orderer)
    }

    /**
     * 
     * @param {string} ordererId 
     * @param {string} name 
     * @param {number} intPort 
     * @param {number} extPort 
     * @param {string} extra 
     */
    updateOrderer(ordererId, name, intPort,extPort,extra=''){
        var orderer = this.orderers.get(ordererId+'.'+this.domain);
        orderer.setName(name);
        orderer.setIntPort(intPort);
        orderer.setExtPort(extPort);
        orderer.setExtra(extra)

        return orderer;

    }

    /**
     * 
     * @param {string} ordererId 
     */
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
