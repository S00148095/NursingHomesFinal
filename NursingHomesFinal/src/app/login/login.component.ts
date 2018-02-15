import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { StorageService } from "../storage.service";
import { AuthService } from '../auth.service';
import 'script.js';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

declare var myExtObject: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  honeypot: string="";
  email: string;
  password: string;
  confirmemail: string;
  confirmpassword: string;
  firstName: string;
  surname: string;
  isHome: Boolean;
  constructor(private storageService: StorageService, public authService: AuthService, private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  Login() {//logs the user in
    if (this.email != null && this.email != undefined && this.password != null && this.password != undefined) {
      this.authService.emailLogin(this.email, this.password);
    }
    else {
      this.showWarning("Please fill out all the fields");
    }
    this.email = this.password = '';
  }

  SignUp() {
    if (this.honeypot.length == 0) {
      if (this.email != null && this.email != undefined && this.confirmemail != null && this.confirmemail != undefined && this.password != null && this.password != undefined && this.confirmpassword != null && this.confirmpassword != undefined && this.firstName != null && this.firstName != undefined && this.surname != null && this.surname != undefined) {
        if (this.email == this.confirmemail) {
          if (this.password == this.confirmpassword) {
            if (this.isHome) {
              this.authService.emailSignUp(this.email, this.password, this.firstName, this.surname).then(val => {
                this.router.navigateByUrl("/webSide/home-signup");
              });
            }
            else {
              this.authService.emailSignUp(this.email, this.password, this.firstName, this.surname).then(val => {
                this.router.navigateByUrl("/webSide/account");
              });
            }
          }
          else {
            this.showWarning("Your passwords do not match");
          }
        }
        else {
          this.showWarning("Your emails do not match");
        }
      }
      else {
        this.showWarning("Please fill out all the fields");
      }
    }
    this.email = this.confirmemail = this.password = this.confirmpassword = this.firstName = this.surname = '';

  }
  showWarning(message) {//shows a toast
    this.toastr.warning(message);
  }

  ngAfterViewInit() {
    myExtObject.InitCheckbox();
  }
  ngOnInit() {
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
  }

}
