import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { OrdererSimple } from '../models/ordererSimple';

@Injectable({
  providedIn: 'root'
})
export class OrdererService {

  private orderers:OrdererSimple[];
  private ordererUrl = 'http://localhost:8080/orderers';
  private lastRequest:Subject<OrdererSimple[]>;

  constructor(private http: HttpClient) { 
    this.orderers = null;
    this.lastRequest  =  new Subject();
  }

  getOrderers(){
    if (this.orderers!=null)
      return new Promise<OrdererSimple[]>((resolve)=>{
        resolve(this.orderers)
      })
    else
        return this.http.get<any>(this.ordererUrl,{}).toPromise().then((data)=>{
            this.orderers=[];
            data.orderers.forEach((valie,index,array)=>{
              this.orderers.push(new OrdererSimple(valie.ordererId))
            })
            this.lastRequest.next(this.orderers)
            return this.orderers;  
        },(err)=>{
          throw err;
        })
  }

  getOrderersSubject(){
    return this.lastRequest;
    //return this.http.post(this.startInventoryUrl,{});

  }

  addOrderer(orderer){
    console.log(orderer)
    return  this.http.post<any>(this.ordererUrl,orderer).toPromise().then((data)=>{
      if (this.orderers ==null)
        this.orderers = [new OrdererSimple (data.ordererId)]
      else 
        this.orderers.push(new OrdererSimple (data.ordererId));
      this.lastRequest.next(this.orderers);
      return data
    },
    (err)=>{
      console.log(err)
      this.lastRequest.error(err);
      throw err;
      //return err;
    })

    
  }

//   let orderupdate={
//     name:"orderNuevo",
//     intPort:8050,
//     extPort : 6060,
//     extra :"extra"
// }

  updateOrderer(orderer){
    return  this.http.put<any>(this.ordererUrl+"/"+orderer.ordererId,orderer).toPromise().then((data)=>{
     return data;
    },
    (err)=>{
      console.log(err)
      this.lastRequest.error(err);
      return err;
    })

  }

  deleteOrderer(ordererId){
    return this.http.delete(this.ordererUrl+"/"+ordererId).toPromise().then((data)=>{
      this.orderers = this.orderers.filter((value:any,index,array)=>{
            return value.ordererId !=ordererId;
      })
      return data;
    })

  }
  reset(){
    this.orderers=[]
    this.lastRequest.next(this.orderers);
  }

}
