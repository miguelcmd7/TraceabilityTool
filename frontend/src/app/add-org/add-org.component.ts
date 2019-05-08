import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OrgService } from '../org.service';
import { NetworkService } from '../network.service';
//import { MustMatch } from "./_helpers/must-match.validator";

@Component({
  selector: "app-add-org",
  templateUrl: "./add-org.component.html",
  styleUrls: ["./add-org.component.css"]
})
export class AddOrgComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  netDomain : String;

  constructor(private formBuilder: FormBuilder,private orgService:OrgService, private netService:NetworkService) {
    this.netDomain = null;

  }

  ngOnInit() {
    this.netDomain = this.netService.getDomain();
    this.registerForm = this.formBuilder.group(
      {
        orgId: ["digibank", Validators.required],
        mspId: ["digiMSP", [Validators.required]],
        name: ["Digibank", [Validators.required]],
        ca_name: ["digiCA", Validators.required]
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
   console.log(this.registerForm.value);
    this.orgService.addOrg(this.registerForm.value).then((data)=>{
      this.submitted= true;
      alert("SUCCESS!! :-)\n\n" + JSON.stringify(data));
    },(err)=>{
      alert("Error!! :-)\n\n" + err);
    }
      
    ).catch((err=>{
      console.log(err);
    }))

  }
}
