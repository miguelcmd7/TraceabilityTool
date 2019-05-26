class Channel{
    constructor(name,consortium,orderers=[], peersByOrgs= new Map()){
        /**@type {Map<string, string[]>} */
        this.peersByOrgs  = peersByOrgs;
        this.name=name;
        this.orderers= orderers;
        this.consortium = consortium;
    }
    
    getName(){
        return this.name;
    }
    
    getOrgs(){
        let keys =[];   
        for ( let  [key, ] of this.peersByOrgs.entries()) {
            keys.push(key)
        }
        return keys
    }
    
    getPeers(){
        let peers= []
        for ( let [, value] of this.peersByOrgs.entries()) {
            peers = peers.concat(value)
        }
        return peers;
    }
    
    getOrderers(){
        return this.orderers;
    }
    getConsortium(){
        return this.consortium;
    }

    /**
     * @returns {Map<string, string[]>}
     */
    getPeerByOrgs(){
        return this.peersByOrgs
    }
    

    addPeer(peerId, orgId){
        let peers =this.peersByOrgs.get(orgId);
        if(peer == null || peers.includes(peerId)){
            return false;
        }else{
            peers.push(peerId)
            this.peersByOrgs.set(orgId,peers);
            return true;
        }
    }
    addOrderer(OrdererId){
        if(this.orderers.includes(OrdererId)){
            return false;
        }else{
            this.orderers.push(OrdererId);
            return true;
        }
    }
    removePeer(peerId, orgId){
        let peers = this.peersByOrgs.get(orgId)
       if (peers != null){
            peers= peers.filter((value,index,array)=>{
                return value != peerId;
        })
        this.peersByOrgs.set(orgId,peers);
       }

    }
    removeOrg(orgId){
        if(this.peersByOrgs.has(orgId))
            this.peersByOrgs.delete(orgId)
    }
    
    removeOrderer(ordererId){
        this.orderers = this.orderers.filter((value,index,array)=>{
            return value != ordererId
       })
    }

    toJSON(){
        var json ={}
        let keys =[];
        let peers= []
        for ( let [key, value] of this.peersByOrgs.entries()) {
            
            keys.push(key)
            peers = peers.concat(value)
        }

        json.orderers = this.orderers;
        json.orgs = keys;
        json.peers = peers;
        json.consortium = this.consortium;
        json.name = this.name;
        return json;

    }
}
module.exports = Channel;