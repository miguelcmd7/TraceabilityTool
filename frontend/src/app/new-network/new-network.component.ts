import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import { NetworkService } from "../network.service";

@Component({
  selector: "app-new-network",
  templateUrl: "./new-network.component.html",
  styleUrls: ["./new-network.component.css"]
})
export class NewNetworkComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  private domain: string;
  folder: string;

  constructor(
    private formBuilder: FormBuilder,
    private networkService: NetworkService
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

    this.networkService.createNetwork(this.registerForm.value).then(
      (data) => {
        this.submitted = true;
        this.domain = data.domain;
        console.log("Network "+data.netDomain+" Created")
      },
      err => {
        alert("Error creating network!! :-)\n\n" + err);
      }
    );
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

  // browse() {
  //   remote.dialog.showOpenDialog({title: 'Select a folder', properties: ['openDirectory']}, (folderPath) => {
  //       if (folderPath === undefined){
  //           console.log("You didn't select a folder");
  //           return;
  //       }
  //       this.folder = folderPath.toString();
  //   });
  // }
}
