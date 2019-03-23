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

    constructor(name, domain) {
        this.name = name;
        this.domain = domain;
        this.peers = new Map();
        this.peerByOrgs = new Map();
        this.orgs = new Map();
        this.orderers = new Map();
        this.channels = [];

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
    getOrgs(){
        return this.orgs.values()
    }
    getOrderers() {
        return this.orderers.values();
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
    getChannelOrgs(channel){
        let msps=[]
       
        for (let  orgId of channel.getOrgs()){
            msps.push(this.orgs.get(orgId).getMspId())
        }
        return msps;
    }
    addPeer(peer, orgId) {
        var peerid = peer.getAllId()

        if (this.peers.get(peerid) == null) {
            this.peers.set(peerid, peer)
            var orgPeers = this.peerByOrgs.get(orgId);
            //console.log(orgPeers);
            orgPeers.push(peerid)
            this.peerByOrgs.set(orgId, orgPeers);
        }

    }

    //TODO Implementar exceptions, error al añadir existente.
    addOrg(org) {
        this.orgs.set(org.getAllId(), org);
        this.peerByOrgs.set(org.getAllId(), [])
    }
    addChannel(channel){
        if(!this.channels.includes(channel)){
            this.channels.push(channel);
        }

    }

    addOrderer(orderer) {
        this.orderers.set(orderer.getId() + '.' + this.domain, orderer)
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
        networkJson.netDomain = this.domain
        networkJson.casByOrg = []
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
            networkJson.orderers.push(Object.assign(value.toJSON(), ordererConf(value)))
        }

        // this.orgs.forEach(eachOrg);
        // this.peerByOrgs.forEach(OrgsPeer)
        // this.orderers.forEach(eachOrderer)



        return networkJson
    }

}
module.exports = Network;
