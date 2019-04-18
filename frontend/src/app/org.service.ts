import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject, Observable, of } from 'rxjs';
import {Org} from './org'
@Injectable({
  providedIn: 'root'
})
export class OrgService {
  private orgs:Org[];
  private orgUrl = 'http://localhost:8080/orgs';
  private lastRequest;

  constructor(private http: HttpClient) { 
    this.orgs = null;
    this.lastRequest  =  new Subject();
  }

  getOrgs(){
    if (this.orgs ==null){
        this.http.get<Org[]>(this.orgUrl,{}).subscribe((orgs)=>
        {
          this.orgs = orgs;
          this.lastRequest.next(this.orgs);
        }),(err)=>{
          this.orgs = null;
          this.lastRequest.error(err);
        }

    }

  }
  getOrgsSubject(){
    return this.lastRequest ;
    //return this.http.post(this.startInventoryUrl,{});

  }
  addOrg(org){
    console.log(org)
    let request = this.http.post<Org>(this.orgUrl,org);
    request.subscribe((data)=>{
      if (this.orgs ==null)
        this.orgs = [data]
      else 
        this.orgs.push(data);
      this.lastRequest.next(this.orgs);
    },
    (err)=>{
      console.log(err)
      this.orgs= null;
      this.lastRequest.error(err);
    })
    return request
    
  }
}
