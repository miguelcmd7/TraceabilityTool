import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChaincodeService {

  private channelUrl = 'http://localhost:8080/chaincodes';
  private lastRequest;
  private chaincodes =[] 
  constructor(private http: HttpClient) {
    
    this.lastRequest  =  new Subject();
  }
  
  addChaincode(form){
    let bodyRequest //= this.formToBodyRequest(form)
     return  this.http.post<any>(this.channelUrl+'/',bodyRequest).toPromise().then((data)=>{
     
      this.chaincodes.push(data.name)
      this.lastRequest.next(this.chaincodes);
      return data
    },
    (err)=>{
      console.log(err)
      this.lastRequest.error(err);
      throw err;
      //return err;
    })
  }


  
}
