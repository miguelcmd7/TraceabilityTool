import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private networkUrl = 'http://localhost:8080/network';
  private buildkUrl = 'http://localhost:8080/build';
  private directoryUrl = 'http://localhost:8080/directory';
  private domain:string ;
  lastRequest: Subject<{}>;


  constructor(private http: HttpClient) { 
    this.domain = null;
    this.lastRequest  =  new Subject();
    
  }

  getDomain(){
    if (this.domain ==null){
        this.http.get<any>(this.networkUrl,{}).subscribe((response)=>{
            this.domain = response.domain;
        },
        (err)=>{

        })
    }

  }
  createNetwork(network){
    let request =this.http.post<any> (this.networkUrl,network,{})
    request.subscribe((data)=>{
      this.domain = data.domain;
    })
    
    return request; 

  }

  build(){
    return this.http.post(this.buildkUrl,{},{})
  }
}
