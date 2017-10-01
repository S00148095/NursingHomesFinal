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

  GetHome(): void {
    this.currentHome = this.storageService.getCurrentHome();
  }
  GetUser(): void {
    this.currentUser = this.storageService.getUser();
  }
  CheckHome(): boolean {
    if(this.currentHome!=null) return true;
    else return false;
  }
  CheckUserEmail(): string {
    if(this.currentUser!=null) return this.currentUser.email;
    else return "";
  }
  CheckUserPhone(): string {
    if(this.currentUser!=null) return this.currentUser.phone;
    else return "";
  }
  CheckHomeEmail(): string {
    if(this.currentHome!=null) return this.currentHome.email;
    else return "";
  }

  ngOnInit() {
    myExtObject.initFullpage("not home");
  }

}
