import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OrgService } from '../org.service';
//import { MustMatch } from "./_helpers/must-match.validator";

@Component({
  selector: "app-add-org",
  templateUrl: "./add-org.component.html",
  styleUrls: ["./add-org.component.css"]
})
export class AddOrgComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private orgService:OrgService) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        orgId: ["asdf", Validators.required],
        domain: ["asdf", Validators.required],
        mspId: ["asdf", [Validators.required]],
        name: ["aaaaa", [Validators.required]],
        ca_name: ["fffff", Validators.required]
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
   console.log(this.registerForm.value);
    this.orgService.addOrg(this.registerForm.value).subscribe((data)=>{
      this.submitted= true;
      alert("SUCCESS!! :-)\n\n" + JSON.stringify(data));
    },(err)=>{
      alert("Error!! :-)\n\n" + err);
    }
      
    )

  }
}
