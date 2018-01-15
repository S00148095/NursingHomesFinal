import { Component, OnInit } from '@angular/core';
import { StorageService } from "../storage.service";
import { AuthService } from '../auth.service';
import 'script.js';

declare var myExtObject: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private storageService: StorageService,public authService: AuthService) { }

  Login() {//logs the user in    
    this.storageService.LogIn();
    this.authService.emailLogin(this.email, this.password);
    this.email = this.password = '';
  }

  ngOnInit() {
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
  }

}
