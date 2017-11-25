import { Component, OnInit } from '@angular/core';
import { Home } from "../Home";
import { User } from "../User";
import { StorageService } from "../storage.service";
import 'script.js';

declare var myExtObject: any;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  currentHome: Home;
  currentUser: User;

  constructor(private storageService: StorageService) 
  {
    this.GetHome();
    this.GetUser();
  }

  GetHome(): void {//gets the current home from the service(ie the one the user just came from if applicable) to autofill their details
    this.currentHome = this.storageService.getCurrentHome();
  }
  GetUser(): void {//gets the current user to autofill their details
    this.currentUser = this.storageService.getUser();
  }
  CheckHome(): boolean {//shows the address etc of the current home if applicable
    if(this.currentHome!=null) return true;
    else return false;
  }
  CheckUserEmail(): string {//autofills email if a user is logged in
    if(this.currentUser!=null) return this.currentUser.email;
    else return "";
  }
  CheckUserPhone(): string {//autofills phone if a user is logged in
    if(this.currentUser!=null) return this.currentUser.phone;
    else return "";
  }
  CheckHomeEmail(): string {//autofills the home's email ig applicable
    if(this.currentHome!=null) return this.currentHome.email;
    else return "";
  }

  ngOnInit() {
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
  }

}
