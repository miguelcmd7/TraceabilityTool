import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private networkUrl = 'http://localhost:8080/network';
  private buildUrl = 'http://localhost:8080/build';
  private directoryUrl = 'http://localhost:8080/directory';
  private domain:string ;
  lastRequest: Subject<{}>;


  constructor(private http: HttpClient) { 
    this.domain = null;
    this.lastRequest  =  new Subject();
    
  }

  getDomain(){
    return this.domain;

  }
  createNetwork(network){
    return this.http.post<any>(this.networkUrl,network,{}).toPromise().then((data)=>{
                                                                            this.domain = data.netDomain
                                                                            return data})

  }

  build(){
    return this.http.post(this.buildUrl,{},{})
  }
}
