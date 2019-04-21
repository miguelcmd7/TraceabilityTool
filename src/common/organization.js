
class Organization {


    /**
     * @param  {string} name
     * @param  {Peer[]} peers
     * @param  {} ca_name
     * @param  {} mspId
     */
    constructor(name, orgId, ca_name, mspId, domain) {
        this.name = name;
        this.orgId = orgId;
        this.ca_name = ca_name;
        this.mspId = mspId;
        this.domain = domain;
    }
    getName() {
        return this.name;
    }
    getOrgId() {
        return this.orgId;
    }
    getDomain() {
        return this.orgId+'.'+this.domain;
    }
    getCa_name() {
        return this.ca_name;
    }
    getAllId() {
        return this.orgId + '.' + this.domain
    }

    getMspId() {
        return this.mspId;
    }

    setName(name){
        this.name=name;
    }

    setMspId(mspId){
        this.mspId=mspId;
    }

    setCaName(caName){
        this.ca_name=caName;
    }

    toJSON() {
        return {
            orgName: this.name,
            domain: this.orgId+'.'+this.domain,
            cas: [{
                casId: this.ca_name,
                caName: this.ca_name
            }],
            orgId:this.orgId,
            orgMSP: this.mspId
        }
    }


}


module.exports = Organization;