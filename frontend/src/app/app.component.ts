import { Component, OnInit } from '@angular/core';
import { NetworkService } from './network.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  registerForm: FormGroup;
  submitted = false;
  private domain:string;

  constructor(private formBuilder: FormBuilder,private networkService:NetworkService) {
    this.domain = null;
  }




}
