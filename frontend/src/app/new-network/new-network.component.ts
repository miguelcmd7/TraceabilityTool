import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrgService } from '../org.service';

@Component({
  selector: 'app-new-network',
  templateUrl: './new-network.component.html',
  styleUrls: ['./new-network.component.css']
})
export class NewNetworkComponent implements OnInit {
  registerForm: any;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder,private orgService:OrgService) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        name: ["asdf", Validators.required],
        domain: ["asdf", Validators.required]
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
