import { Component, OnInit } from '@angular/core';
import { StorageService } from "../storage.service";
import { AuthService } from '../auth.service';
import 'script.js';
import { Router } from '@angular/router';

declare var myExtObject: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  confirmemail: string;
  confirmpassword: string;
  firstName: string;
  surname: string;
  isHome: Boolean;
  constructor(private storageService: StorageService, public authService: AuthService, private router : Router) { }

  Login() {//logs the user in    
    this.authService.emailLogin(this.email, this.password);
    this.email = this.password = '';
  }

  SignUp() {
    if (this.isHome) {      
      this.authService.emailSignUp(this.email, this.password, this.firstName, this.surname).then(val =>{
        this.router.navigateByUrl("/webSide/home-signup");
      });
    }
    else
    {
      this.authService.emailSignUp(this.email, this.password, this.firstName, this.surname);
    }
    this.email = this.confirmemail = this.password = this.confirmpassword = this.firstName = this.surname = '';
  }

  ngAfterViewInit() {
    myExtObject.InitCheckbox();
  }
  ngOnInit() {
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
  }

}
