import { Component, OnInit } from "@angular/core";
import { OrdererService } from "../orderer.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NetworkService } from "src/app/network/network.service";
import { ToastrService } from "ngx-toastr";
import { errorManager, successManager } from "src/app/utils/util";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-create-orderer",
  templateUrl: "./create-orderer.component.html",
  styleUrls: ["./create-orderer.component.css"]
})
export class CreateOrdererComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  netDomain: String;
  ordererId: string = null;
  updating: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private oredererService: OrdererService,
    private netService: NetworkService,
    private toastr: ToastrService,
    private _Activatedroute: ActivatedRoute
  ) {
    this.netDomain = null;
  }

  ngOnInit() {
    this.netDomain = this.netService.getDomain();
    this._Activatedroute.params.subscribe(params => {
      console.log("URL changes");
      this.ordererId = params["ordererId"];
      if (this.ordererId != null)
      this.oredererService.getOrderer(this.ordererId).then(data => {
        //console.log("El subtring es "+)
        this.updating = true;
        this.registerForm = this.formBuilder.group({
          name: [data.ordererName, Validators.required],
          intPort: [data.IntPort, [Validators.required]],
          extPort: [data.ExtPort, [Validators.required]],
          id: [{ value: data.ordererId, disabled: true }, Validators.required]
        });
      });
    });
    if (this.ordererId == null) {
      this.registerForm = this.formBuilder.group({
        name: ["Orderer", Validators.required],
        id: ["orderer", [Validators.required]],
        extPort: [null, [Validators.required]],
        intPort: [7050, []]
      });
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid && !this.registerForm.pending) {
      console.log(this.registerForm.value);
      this.oredererService.addOrderer(this.registerForm.value).then(
        data => {
          successManager(
            this.toastr,
            "Orderer " + this.registerForm.value.name + " created",
            null
          );
        },
        err => {
          errorManager(this.toastr, err);
        }
      );
    } else {
      console.log("Form is invalid");
    }
  }

  onUpdate() {
    // let config  = new PeerConfig(this.registerForm.value.extPort,this.registerForm.value.intPort,this.registerForm.value.anchor)
     console.log(this.registerForm.value)
     this.oredererService.updateOrderer(this.ordererId,this.registerForm.value)
    console.log("Updating");
  }
  onDelete() {
    console.log("DEleting...");
  }
  getNameErrorMessage() {
    return this.f.name.hasError("required") ? "You must enter a value" : "";
  }
  getIdErrorMessage() {
    return this.f.orgId.hasError("required") ? "Organization is required" : "";
  }
  getExtPortErrorMessage() {
    return this.f.extPort.hasError("required")
      ? "External port is required"
      : "";
  }
}
