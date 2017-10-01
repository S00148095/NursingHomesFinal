import { Component, OnInit } from '@angular/core';
import { StorageService } from "../storage.service";
import 'script.js';

declare var myExtObject: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  Login() {
    this.storageService.LogIn();
  }

  ngOnInit() {
    myExtObject.initFullpage("not home");
  }

}
