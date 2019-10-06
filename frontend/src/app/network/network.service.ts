import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private networkUrl = 'http://localhost:8080/network';
  private buildUrl = 'http://localhost:8080/build';
  private directoryUrl = 'http://localhost:8080/directory';
  private isinstanceUrl = 'http://localhost:8080/isInstanciated';
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
    return this.http.post<any>(this.buildUrl,{},{}).toPromise();
    //return this.lastRequest;
  }

  deleteNetwork(){
    return this.http.delete(this.networkUrl).toPromise();
  }

  isInstanciated(){
    return this.http.get<any>(this.isinstanceUrl).toPromise();
  }
}
