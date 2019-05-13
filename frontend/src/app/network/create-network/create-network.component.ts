import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NetworkService } from 'src/app/network/network.service';
import { ToastrService } from 'ngx-toastr';
import { OrdererService } from 'src/app/orderer/orderer.service';
import { PeerService } from 'src/app/peer/peer.service';
import { OrgService } from 'src/app/org/org.service';

@Component({
  selector: 'app-create-network',
  templateUrl: './create-network.component.html',
  styleUrls: ['./create-network.component.css']
})
export class CreateNetworkComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  private domain: string;
  folder: string;
  

  constructor(
    private formBuilder: FormBuilder,
    private networkService: NetworkService,
    private toastr: ToastrService,
    private ordererService:OrdererService,
    private peerService:PeerService,
    private orgService:OrgService
  ) {
    this.domain = null;
    this.folder = null;

  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      directory: ["/home/miguel/Hyperledger/ejemplo", Validators.required],
      domain: ["mired", Validators.required],
      name: ["mired", [Validators.required]]
    });
    
    
  

  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log(this.registerForm.value);
   // if(confirm("Are you sure to create Network "+this.registerForm.value.name+"?")){
        this.networkService.deleteNetwork().then(()=>{
          this.orgService.reset();
          this.ordererService.reset();
          this.peerService.reset();
          this.networkService.createNetwork(this.registerForm.value).then(
            (data) => {
              this.submitted = true;
              this.domain = data.domain;
              this.toastr.success("Network "+data.netDomain+" Created", null,
                {timeOut: 2000});;
              console.log("Network "+data.netDomain+" Created")
            },
            err => {
              this.toastr.error("Network creating network", null,
                  {timeOut: 2000});;
            }
          );
        })
 // }
      
  }

  selectFolder(e) {
    console.log(e);
    var theFiles = e.target.files;
    console.log(theFiles);
    var relativePath = theFiles[0].mozFullPath;
    console.log(relativePath);
    //var folder = relativePath.split("/");
    alert(relativePath);
  }

}
