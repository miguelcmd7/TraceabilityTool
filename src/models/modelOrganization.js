const Organization = require('../common/organization.js');
const Network = require('../common/network.js');

/**
 * @type {Network} 
 */
var network = null;

function getInstance(){

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
    let orgs = []
    for (let org of network.getAllOrgs()){
        orgs.push(org.toJSON())
    }
    json={orgs}
    return json
}

exports.getOrg= function(orgId){
    getInstance()
    return network.getOrg(orgId+'.'+network.getDomain()).toJSON();

}


exports.createOrg= function(name, orgId, ca_name, mspId){
    getInstance()
    let org = new Organization(name, orgId, ca_name, mspId, orgId+'.'+network.getDomain())
    console.log('Creating org...'+org.getAllId())
    network.addOrg(org);
    return org.toJSON()
        

}
exports.updateOrg = function(orgId,orgName,org_ca,orgMspId){
    getInstance()
    return network.updateOrg(orgId+'.'+network.getDomain(),orgName,org_ca,orgMspId).toJSON()

}

exports.deleteOrg = function(orgId){
    getInstance()
    network.deleteOrg(orgId+'.'+network.getDomain());
}