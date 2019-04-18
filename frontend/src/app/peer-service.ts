import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject, Observable, of } from "rxjs";
import { Peer } from "./peer";
@Injectable({
  providedIn: "root"
})
export class PeerService {
  private peer: Peer;
  private orgUrl = "http://localhost:8080/orgs";
  private lastRequest;

  constructor(private http: HttpClient) {
    this.peer = null;
    this.lastRequest = new Subject();
  }

  getPeer(peerId, orgId) {
    if (this.peer == null) {
      this.http
        .get<Peer>(this.orgUrl + "/" + orgId + "/peers/" + peerId, {})
        .subscribe(orgs => {
          this.peer = orgs;
          this.lastRequest.next(this.peer);
        },
        err => {
          this.peer = null;
          this.lastRequest.error(err);
        });
    }
  }
  getOrgsSubject() {
    return this.lastRequest;
    //return this.http.post(this.startInventoryUrl,{});
  }
}
