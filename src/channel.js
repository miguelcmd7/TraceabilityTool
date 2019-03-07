class Channel{
    constructor(name,peers=[],orderers=[]){
        this.name=name;
        this.peers= peers;
        this.orderers= orderers;
    }
}