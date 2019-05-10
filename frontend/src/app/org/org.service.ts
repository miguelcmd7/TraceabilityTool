import { Injectable } from '@angular/core';
import { OrgSimple } from '../models/orgSimple';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Org } from '../models/org';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  private orgs:OrgSimple[];
  private orgUrl = 'http://localhost:8080/orgs';
  private lastRequest:Subject<OrgSimple[]>;

  constructor(private http: HttpClient) { 
    this.orgs = null;
    this.lastRequest  =  new Subject();
  }

  getOrgs(){
    if (this.orgs!=null)
      return new Promise<OrgSimple[]>((resolve)=>{
        resolve(this.orgs)
      })
    else
        return this.http.get<any>(this.orgUrl,{}).toPromise().then((data)=>{
            this.orgs=[];
            data.orgs.forEach((valie,index,array)=>{
              this.orgs.push(new OrgSimple(valie.orgId))
            })
            this.lastRequest.next(this.orgs)
            return this.orgs;  
        },(err)=>{
          throw err;
        })
  }

  getOrgsSubject(){
    return this.lastRequest;
    //return this.http.post(this.startInventoryUrl,{});

  }

  addOrg(org){
    console.log(org)
    return  this.http.post<any>(this.orgUrl,org).toPromise().then((data)=>{
      if (this.orgs ==null)
        this.orgs = [new OrgSimple (data.orgId)]
      else 
        this.orgs.push(new OrgSimple (data.orgId));
      this.lastRequest.next(this.orgs);
      return data
    },
    (err)=>{
      console.log(err)
      this.lastRequest.error(err);
      throw err;
      //return err;
    })

    
  }
  updateOrg(org){
    return  this.http.put<Org>(this.orgUrl+"/"+org.orgId,org).toPromise().then((data)=>{
     return data;
    },
    (err)=>{
      console.log(err)
      this.lastRequest.error(err);
      return err;
    })

  }

  deleteOrg(orgId){
    return this.http.delete(this.orgUrl+"/"+orgId).toPromise().then((data)=>{
      this.orgs = this.orgs.filter((value:any,index,array)=>{
            return value.orgId !=orgId;
      })
      return data;
    })

  }


}
