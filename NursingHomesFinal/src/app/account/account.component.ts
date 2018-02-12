import { Component, OnInit } from '@angular/core';
import { User } from "../User";
import { StorageService } from "../storage.service";
import 'script.js';
import { Home } from '../Home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';

declare var $:any;
declare var myExtObject: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  profile: any;
  User: User;
  UserHomes: Home[] = [];

  publicUser: Observable<boolean>;
  displayName: string;
  email: string;

  changeUserName: string;
  changeEmailMod: string;
  changePasswordMod: string;
  changePasswordConfirm: string;

  constructor(private storageService: StorageService, private afa: AngularFireAuth, private authService: AuthService) {
  }
  CheckHouses()
  {
    if(this.UserHomes.length==0||this.UserHomes==null||this.UserHomes==undefined)
    {
      return false;
    }
    else return true;
  }
  GetUser(): void {//gets the current user from the service
    this.afa.authState.subscribe((resp) => {
      if (resp != null) {
        if (resp.uid) {
          this.displayName = resp.displayName;
          this.email = resp.email;
          this.storageService.getUser(resp.uid).subscribe(user => {
            this.User = user;
            console.log('##########################');
            console.log(this.User.publicUser);
            this.publicUser = Observable.of(this.User.publicUser);
            if(user.homes!=null&&user.homes!=undefined){
              for (var k in user.homes) {
                this.UserHomes.push(user.homes[k]);
              }
            }
          });
        } 
      }
    });
  }
  CheckUser() {//checks if there is anyone logged in and shows the page if there is
    if (this.User != null) {
      return true;
    }
    else return false;
  }
  changePassword()
  {
    this.authService.resetPassword(this.User.email);
  }
  changeEmail()
  {
    //this.authService.changeEmail();
  }
  ngOnInit() {
    this.GetUser();
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
  }

  public updateDisplayName(){
    //update the user's displayName
    if(this.changeUserName != null && this.changeUserName != '' && this.changeUserName != undefined){
      this.authService.updateUserDisplayName(this.changeUserName);
      $('.ui.modal.change-user-name')
            .modal('hide')
        ;
    }
  }

  public updateEmail(){
    //update user's email
    if(this.changeEmailMod != null && this.changeEmailMod != '' && this.changeEmailMod != undefined){
      this.authService.updateEmail(this.changeEmailMod);
      $('.ui.modal.change-email')
            .modal('hide')
        ;
    }
  }

  public updatePassword(){
    //updates user's password
    if(this.changePasswordMod != null && this.changePasswordMod != '' && this.changePasswordMod != undefined){
      if(this.changePasswordMod == this.changePasswordConfirm){
        this.authService.updatePassword(this.changePasswordMod);
        $('.ui.modal.change-password')
            .modal('hide')
        ;
      }
    }
  }



 }


