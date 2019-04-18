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
exports.getPeersByOrgs= function(){
    getInstance()
    var json= {};
    for (org of network.getAllOrgs()){
        Object.assign(json,org.toJSON())
    }
}
exports.getAllOrgs= function(){
    getInstance()
    var json={}
    for (org of network.getAllOrgs()){
        Object.assign(json,org.toJSON())
    }
    
    return json
}

exports.getOrg= function(orgId){
    getInstance()
    return network.getOrg(orgId).toJSON();

}

//constructor(name, orgId, ca_name, mspId, domain)
exports.createOrg= function(name, orgId, ca_name, mspId, domain){
    getInstance()
    org = new Organization(name, orgId, ca_name, mspId, domain)
    network.addOrg(org);
    return org.toJSON()


}
exports.updateOrg = function(orgId,orgName,org_ca,orgMspId){
    getInstance()
    return network.updateOrg(orgId,orgName,org_ca,orgMspId).toJSON()

}
exports.deleteOrg = function(orgId){
    getInstance()
    network.deleteOrg(orgId);
}