import { Component, OnInit } from '@angular/core';
import { Home } from "../Home";
import { StorageService } from "../storage.service";
import { Router } from "@angular/router";
import { User } from "../User";

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {
  currentHome: Home;
  currentUser: User;

  constructor(private storageService: StorageService, private router: Router) {
    this.GetCurrentHome();
    this.GetCurrentUser();
  }

  GetCurrentUser(): void {
    this.currentUser = this.storageService.getUser();
  }
  GetCurrentHome(): void {
    this.currentHome = this.storageService.getCurrentHome();
  }
  CheckHome():boolean {
    if (this.currentHome != null || this.currentHome != undefined) {
      if(this.currentHome.userID == this.currentUser.email) return true;
      else this.Redirect();
    }
    else {
      return false;
    }
  }
  Redirect(): void {
    this.router.navigateByUrl('/home');
  }
  GetName():string
  {
    return this.currentHome.name;
  }
  GetAddress():string
  {
    return this.currentHome.address;
  }
  GetCounty():string
  {
    return this.currentHome.county;
  }
  GetCountry():string
  {
    return this.currentHome.country;
  }
  GetPhone():string
  {
    return this.currentHome.phone;
  }
  GetEmail():string
  {
    return this.currentHome.email;
  }
  GetContact():string
  {
    return this.currentHome.contact;
  }
  GetSite():string
  {
    return this.currentHome.site;
  }
  GetBeds():string
  {
    return this.currentHome.beds;
  }
  GetStaff():string
  {
    return this.currentHome.staff;
  }
  GetDescription():string
  {
    return this.currentHome.description;
  }
  ngOnInit() {
  }

}
