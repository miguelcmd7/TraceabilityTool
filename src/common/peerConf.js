class PeerConf {
    
    /**
     *Creates an instance of PeerConf.
     * @param {Object} obj
     * @param {number} obj.intPort
     * @param {number} obj.extPort
     * @param {number} obj.extGossipPort
     * @param {number} obj.intGossipPort
     * @param {anchor} obj.anchor
     * @param {string} obj.extra
     * @memberof PeerConf
     * @constructor
     */
    constructor({extPort, intPort = extPort, extGossipPort = intPort +1,intGossipPort = extGossipPort,anchor = false, extra=''}){
        this.anchor= anchor;
        this.extGossipPort = extGossipPort
        this.intGossipPort = intGossipPort
        this.intPort= intPort;
        this.extPort =extPort;
        this.extra = extra;
    }

}
module.exports = PeerConf;