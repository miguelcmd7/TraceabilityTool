const Organization = require('../common/organization.js');
const Network = require('../common/network.js');
var network = null;

function getInstance(){
    if (network==null)
        network = Network.getInstance()
    if (network==null)
        throw "Network not created"
    return network
}

//constructor(name, orgId, ca_name, mspId, domain)
exports.createOrg= function(name, orgId, ca_name, mspId, domain){
    getInstance()
    org = new Organization(name, orgId, ca_name, mspId, domain)
    network.addOrg(org);
    return org.toJSON()


}
exports.updateOrg = function(){

}
exports.deleteOrg = function(){

}