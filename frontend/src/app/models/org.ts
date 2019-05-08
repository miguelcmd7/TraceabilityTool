

export class Org {
    
    orgId: String;
    name: String;
    ca_name: String;
    mspId: String

    constructor(orgId:string,name:string,ca_name:string,mspId:String){
      this.orgId = orgId;
      this.name = name;
      this.ca_name = ca_name;
      this.mspId = mspId; 
    }


  }