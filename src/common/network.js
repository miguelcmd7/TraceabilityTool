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
        this.isBuildingVar = false;
        this.buildState = {description:'',code:0,error:false}
        
        /**
         * @type {Map<string,Peer>} 
         */
        this.peers = new Map();
        
        
        
        /**
         * @type {Map<string,Organization>} 
         */
        this.orgs = new Map();
        
        /**
         * @type {Map<string,Orderer>} 
         */
        this.orderers = new Map();

        /**
         * @type {Map<string,string[]>} 
         */
        this.peerByOrgs = new Map();
        /**
         * @type {Map<string,string[]>} 
         */
        this.channelsByOrg = new Map();
        
        /**
         * @type {Map<string,string[]>} 
         */
        this.channelsByOrderer = new Map();
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
          //  console.log('Limpiando...')
            Network.instance.clean()
            Network.instance=null
        }
        return true
        

    }

    createError(number, message){
        return new ErrorWithCode(number,message)
    }

    getBuildState(){
        return this.buildState;
    }
    /**
     * 
     * @param {boolean} error 
     * @param {string} description 
     */
    setState(error,code,description){
        this.buildState= {error:error,code:code,description:description}
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

    getAllPeersForOrg(orgId){
        let peerIds = this.peerByOrgs.get(orgId)
        if (peerIds!= null){
            let peers = []
            for(let peerid of peerIds)
                peers.push(this.peers.get(peerid))
            return peers;
        }else
            throw this.createError(404,"Org "+orgId+"not found")

    }
    
    /**
     * @returns {Organization[]} 
     */
    getAllOrgs(){
        return this.orgs.values();
    }

    /**
     * @param {string} peerId
     * @returns {Peer} 
     */
    getPeer(peerId){
        return this.peers.get(peerId);
    }

    getPeersByOrg(){
        let json={}
        json.orgs = []
        for ( let [key, value] of this.peerByOrgs.entries()) { 
            let org = this.orgs.get(key).toJSON()
            org.peers = []
            // if (value != []){
            //     networkJson.peerByOrgs[key].peers=[]
            // }
            for (var peerInOrg of value) {
                var peer = this.peers.get(peerInOrg);
                org.peers.push(peer.toJSON())
            }
            json.orgs.push(org);
        }
        return json
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
        let orderer= this.orderers.get(ordererId)
        if (orderer!=null){
            return orderer;
        }else{
            throw this.createError(404, "Orderer "+ordererId+" not found");
        }
        
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
        let channel =  this.channels.find((value)=>{
            return value.getName()==channelId;
        });
        if (channel == null)
            throw this.createError(404, "Channel "+channelId+ " not found")
        else
            return channel
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
            peer.setConfig(peerConf);
            return peer;
        }else{
            throw this.createError(404, "Peer "+peerAllId+" doesn't exist")
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
                    for (let [key,channels] of this.channelsByOrg.entries()){
                        if(key == orgId){
                            this.channels.forEach((value)=>{
                               if (channels.includes(value.getName())){
                                    console.log("Removing peer "+peerId+ " in channel "+value.getName()) 
                                    value.removePeer(peerId,orgId)
                               }
                                   
                               
                            })
                        }
                    }
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
            let channelsNames= this.channelsByOrg.get(orgId);
            if (channelsNames != null){
                for(let channel of this.channels)
                    if (channelsNames.includes(channel.getName())   )
                        channel.removeOrg(orgId)
            
                this.channelsByOrg.delete(orgId)
            }
            this.peerByOrgs.delete(orgId);
            this.orgs.delete(orgId)
        }
        else
            throw this.createError(404, "Organization "+orgId+" doesn't exist")
    }
    /**
     * 
     * @param {Channel} channel 
     */
     checkChannel(channel){
        for (let orgId of channel.getOrgs()){Channel
            if (this.orgs.get(orgId)==null)
                 throw this.createError(404, "Organization "+orgId +" doesn't exist")
        }
        for (let peerId of channel.getPeers()){
            if (this.peers.get(peerId)==null)
                 throw this.createError(404, "Peer "+peerId+" doesn't exist")
        }
        for (let ordererId of channel.getOrderers()){
            if (this.orderers.get(ordererId)==null)
                 throw this.createError(404, "Orderer "+ordererId+" doesn't exist")
        }
    }
    /**
     * 
     * @param {Channel} channel 
     */
    addChannelAndDependencies(channel){
        this.channels.push(channel);

            for (let orgId of  channel.getOrgs()){
                let channelsNames = this.channelsByOrg.get(orgId)
                if (channelsNames== null)
                    this.channelsByOrg.set(orgId,[channel.getName()])
                else{
                    channelsNames.push(channel.getName())
                    this.channelsByOrg.set(orgId,channelsNames)
                }
                    
            }
            for (let ordererId of  channel.getOrderers()){
                let channelsNames = this.channelsByOrderer.get(ordererId)
                if (channelsNames== null)
                    this.channelsByOrderer.set(ordererId,[channel.getName()])
                else{
                    channelsNames.push(channel.getName())
                    this.channelsByOrderer.set(ordererId,channelsNames)
                }
                    
            }
    }
    /**
     * 
     * @param {Channel} channel 
     */
    addChannel(channel){

        if(!this.channels.some((value)=>{
            return value.getName()==channel.getName()
        })){
            this.checkChannel(channel)
            this.addChannelAndDependencies(channel)
        }else{
            throw this.createError(409,'Channel '+channel.getName() +' already exists')
        }

    }
    /**
     * 
     * @param {Channel} channel 
     */
    updateChannel(channel){
        
        
        if(!this.channels.some((value, index)=>{
            return value.getName() == channel.getName()
            })){
                throw this.createError(404, "Channel "+channel.getName() +" doesn't exist")
            }
        this.checkChannel(channel)
        this.deleteChannel(channel.getName())  
        this.addChannelAndDependencies(channel)
    }

    /**
     * 
     * @param {string} channelName 
     */
    deleteChannel(channelName){
        console.log('Deleting'+ channelName )
        let channel = null;
        this.channels = this.channels.filter((value,index,arra)=>{
            console.log('Valor parametro '+channelName+' valor array '+value.getName() +' Valor condicion '+(value.getName() != channelName))
            if((value.getName() == channelName)){
                channel= value
            }
            return (value.getName() != channelName);
        })
        if (channel ==null)
            throw this.createError(404, "Channel "+channelName +" doesn't exist")
        else{
            let orgs = channel.getOrgs()
           // console.log(orgs)
            //console.log(this.channelsByOrg.get(orgs[1]))
            for (let [key,channels] of this.channelsByOrg.entries()){
                if (orgs.includes(key))
                    this.channelsByOrg.set(key,channels.filter((value)=>{
                        return value != channelName
                    }))
            }
            let orederers = channel.getOrderers()
            for (let [key,channels] of this.channelsByOrderer.entries()){
                if (orederers.includes(key))
                    this.channelsByOrderer.set(key,channels.filter((value)=>{
                        return value != channelName
                    }))
            }
        }

    }

    /**
     * 
     * @param {Orderer} orderer 
     */
    addOrderer(orderer) {
        if (this.orderers.get(orderer.getAllId())==null){
            this.orderers.set(orderer.getAllId(), orderer)
            return orderer
        }else{
            throw this.createError(409, "Orderer "+orderer.getAllId()+"  Already exist")
        }
        
    }

    /**
     * 
     * @param {string} ordererId 
     * @param {string} name 
     * @param {number} intPort 
     * @param {number} extPort 
     * @param {string} extra 
     */
    updateOrderer(ordererId, name, intPort,extPort,extra){
        
        var orderer = this.orderers.get(ordererId);
        if (orderer!=null){
            if(name!= null)
                orderer.setName(name);
            if(intPort!= null)
                orderer.setIntPort(intPort);
            if(extPort!= null)    
                orderer.setExtPort(extPort);
            if(extra!= null)        
                orderer.setExtra(extra)

        return orderer;
        }else{
            throw this.createError(404, "Orderer "+ordererId+" not found")
        }

    }

    /**
     * 
     * @param {string} ordererId 
     */
    deleteOrderer(ordererId){

        if (this.orderers.get(ordererId)!=null){
            let channelsNames= this.channelsByOrderer.get(ordererId);
            if (channelsNames != null){
                for(let channel of this.channels)
                    if (channelsNames.includes(channel.getName())   )
                        channel.removeOrderer(ordererId)
            
                this.channelsByOrderer.delete(ordererId)
            }
            this.orderers.delete(ordererId);
        }
        else
            throw this.createError(404,"Orderer "+ordererId+" doesn't exists")
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
        //console.log(this.peerByOrgs.entries())
        //console.log(this.orgs.entries());
        networkJson.peerByOrgs = []
        for ( [key, value] of this.peerByOrgs.entries()) {
          
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
