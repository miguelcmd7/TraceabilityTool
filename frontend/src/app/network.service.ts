import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { Subject } from 'rxjs';
import { Org } from './org';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private orgUrl = 'http://localhost:8080/';
  private domain: string ;

  constructor(private http: HttpClient) { 
    this.domain = null;
    this.lastRequest  =  new Subject();
  }

  getDomain(){
    if (this.domain ==null){
        this.http.get<string>(this.orgUrl,{}).subscribe((orgs)=>
        {

        }),(err)=>{

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
