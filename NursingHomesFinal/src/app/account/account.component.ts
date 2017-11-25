import { Component, OnInit } from '@angular/core';
import { User } from "../User";
import { StorageService } from "../storage.service";
import 'script.js';

declare var myExtObject: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  profile: any;
  User: User;
  constructor(private storageService: StorageService) {
    this.GetUser();
  }

  GetUser(): void {//gets the current user from the service
    this.User = this.storageService.getUser();
  }
  CheckUser() {//checks if no one is logged in and shows the not logged in message if so
    this.GetUser();
    if (this.User == null) {
      return true;
    }
    else return false;
  }
  CheckUserNegative() {//checks if there is anyone logged in and shows the page if there is
    this.GetUser();
    if (this.User != null) {
      return true;
    }
    else return false;
  }
  ngOnInit() {
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
  }

}
