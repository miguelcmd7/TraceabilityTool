import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject, Observable, of } from 'rxjs';
import {Org} from './org'
@Injectable({
  providedIn: 'root'
})
export class OrgService {
  private orgs:Array<{orgId:String}>;
  private orgUrl = 'http://localhost:8080/orgs';
  private lastRequest:Subject<Array<{orgId:String}>>;

  constructor(private http: HttpClient) { 
    this.orgs = null;
    this.lastRequest  =  new Subject();
  }

  getOrgs(){
    
    return  this.http.get<Org[]>(this.orgUrl,{}).toPromise().then((data)=>{
      this.orgs=null;
      data.forEach((valie,index,array)=>{
        this.orgs.push({orgId:valie.id})
      })
      this.lastRequest.next(this.orgs)
      return data;  
    }
    )
  }
  getOrgsSubject(){
    return this.lastRequest ;
    //return this.http.post(this.startInventoryUrl,{});

  }

  addOrg(org){
    console.log(org)
    return  this.http.post<Org>(this.orgUrl,org).toPromise().then((data)=>{
      if (this.orgs ==null)
        this.orgs = [{orgId:data.id}]
      else 
        this.orgs.push({orgId:data.id});
      this.lastRequest.next(this.orgs);
      return data
    },
    (err)=>{
      console.log(err)
      this.lastRequest.error(err);
      return err;
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
