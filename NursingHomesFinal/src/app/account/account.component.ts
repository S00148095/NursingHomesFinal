import { Component, OnInit } from '@angular/core';
import { User } from "../User";
import { StorageService } from "../storage.service";
import 'script.js';
import { Home } from '../Home';
import { AngularFireAuth } from 'angularfire2/auth';

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

  constructor(private storageService: StorageService, private afa: AngularFireAuth) {
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
          this.storageService.getUser(resp.uid).subscribe(user => {
            this.User = user;
            for (var k in user.homes) {
              this.UserHomes.push(user.homes[k]);
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
  ngOnInit() {
    this.GetUser();
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
  }

}
