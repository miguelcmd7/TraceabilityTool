import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrgService } from '../org.service';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {


  private orgs = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private orgService:OrgService, private netService:NetworkService ) {
    this.orgs= []
  }

  ngOnInit(): void {
    this.orgService.getOrgsSubject().subscribe((data)=>
    {
      console.log("LAS ORganizaciones son:"+ data)
      this.orgs= data;
    })

    this.orgService.getOrgs();
  }

}
