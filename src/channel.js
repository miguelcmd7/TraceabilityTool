class Channel{
    constructor(name,consortium,orgs=[],peers=[],orderers=[]){
        this.name=name;
        this.peers= peers;
        this.orderers= orderers;
        this.consortium = consortium;
        this.orgs=orgs;
    }
    
    getName(){
        return this.name;
    }
    
    getOrgs(){
        return this.orgs;
    }
    
    getPeers(){
        return this.peers;
    }
    getOrderers(){
        return this.orderers;
    }
    getConsortium(){
        return this.consortium;
    }
    addPeer(peerId){
        if(this.peers.includes(peerId)){
            return false;
        }else{
            this.peers.push(peerId);
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
}
module.exports = Channel;