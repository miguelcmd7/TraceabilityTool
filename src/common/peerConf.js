const ErrorWithCode = require('../../lib/error/error')
class PeerConf {
    
    /**
     *Creates an instance of PeerConf.
     * @param {Object} obj
     * @param {number} obj.intPort
     * @param  {Number} obj.extPort
     * @param {number} obj.extGossipPort
     * @param {number} obj.intGossipPort
     * @param {anchor} obj.anchor
     * @param {string} obj.extra
     * @memberof PeerConf
     * @constructor
     */
    constructor({extPort, intPort = 7050, extGossipPort = extPort +1,intGossipPort = 7053,anchor = false, extra=''}){
        if (extPort==null || typeof extPort !== 'number' ||typeof intPort !== 'number'||typeof extGossipPort !== 'number' || typeof intGossipPort !== 'number')
            throw new ErrorWithCode(400, "ExtPort required");
        this.anchor= anchor;
        this.extGossipPort = extGossipPort
        this.intGossipPort = intGossipPort
        this.intPort= intPort;
        this.extPort =extPort;
        this.extra = extra;
    }

    // get anchor(){
    //     return this.anchor;
    // }
    // get extGossipPort(){
    //     return extGossipPort;
    // }
    // get intGossipPort(){
    //     return extGossipPort;
    // }
    // get extPort(){
    //     return extGossipPort;
    // }

    // set anchor(a){
    //     this.anchor =a;
    // }
    // set extGossipPort(a){
    //     this.extGossipPort =a;
    // }

    // set intGossipPort(a){
    //     this.intGossipPort =a;
    // }

    // set intPort(a){
    //     this.intPort =a;
    // }
    // set extPort(a){
    //     this.extPort =a;
    // }


}
module.exports = PeerConf;