import { Component, OnInit } from '@angular/core';
import { Home } from "../Home";
import { StorageService } from "../storage.service";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../User";
import 'script.js';
import { AngularFireAuth } from 'angularfire2/auth';

declare var myExtObject: any;

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {
  currentHome: Home;
  User: User;
  facilities: any[] = [
    { "id": 0, "name": "Live-In Carers", "value": false },
    { "id": 1, "name": "Chiropody", "value": false },
    { "id": 2, "name": "Oratory", "value": false },
    { "id": 3, "name": "Visiting Area", "value": false },
    { "id": 4, "name": "Hairdressing", "value": false },
    { "id": 5, "name": "Laundry", "value": false },
    { "id": 6, "name": "Library", "value": false },
    { "id": 7, "name": "WiFi", "value": false },
    { "id": 8, "name": "Resident GP", "value": false },
    { "id": 9, "name": "Dietician", "value": false },
    { "id": 10, "name": "Dental Care", "value": false },
    { "id": 11, "name": "Pool", "value": false },
    { "id": 12, "name": "Garden", "value": false },
    { "id": 13, "name": "Group Outings", "value": false },
    { "id": 14, "name": "Bingo", "value": false }
  ];
  careTypes: any[] = [
    { "id": 0, "name": "Alzheimer’s", "value": false },
    { "id": 1, "name": "Cancer", "value": false },
    { "id": 2, "name": "Hearing", "value": false },
    { "id": 3, "name": "Speech Area", "value": false },
    { "id": 4, "name": "Visual", "value": false },
    { "id": 5, "name": "Residential", "value": false },
    { "id": 6, "name": "Respite", "value": false },
    { "id": 7, "name": "Convalescent", "value": false },
    { "id": 8, "name": "Dementia", "value": false },
    { "id": 9, "name": "Physiotherapy", "value": false }
  ];

  constructor(private afa: AngularFireAuth,private storageService: StorageService, private router: Router, private route: ActivatedRoute) {

  }

  GetCurrentUser(): void {//gets the current user
    this.afa.authState.subscribe((resp) => {
      if (resp != null) {
        if (resp.uid) {
          this.storageService.getUser(resp.uid).subscribe(user => {
            this.User = user;
            this.populateCheck();
          });
        }
      }
    });
  }
  GetHome(id): void {//gets the current home
    this.storageService.getCurrentHome(id).subscribe(home => {
      this.currentHome = home;
      this.populateCheck()
    });
  }
  populateCheck()
  {
    if (this.currentHome != null && this.currentHome != undefined && this.User != null && this.User != undefined) {
      if (this.currentHome.userID == this.User.email) {
        this.PopulateFacilities();
      }
      else this.Redirect();
    }
  }
  CheckHome(): boolean { //checks if the current home is null and either populates the checkboxes or redirects the user
    if (this.currentHome != null && this.currentHome != undefined && this.User != null && this.User != undefined) {
      return true;
    }
    else {
      return false;
    }
  }
  PopulateFacilities(): void {//populates the check boxes
    this.facilities.forEach(element => {
      element.value = this.currentHome.facilities[element.id];
    });
    this.careTypes.forEach(element => {
      element.value = this.currentHome.careTypes[element.id];
    });
  }
  Redirect(): void {//redirects the user
    this.router.navigateByUrl('/');
  }
  GetName(): string {//autofills the name
    return this.currentHome.name;
  }
  GetAddress(): string {//autofills the address
    return this.currentHome.address;
  }
  GetCounty(): string {//autofills the county
    return this.currentHome.county;
  }
  GetCountry(): string {//autofills the country
    return this.currentHome.country;
  }
  GetPhone(): string {//autofills the phone
    return this.currentHome.phone;
  }
  GetEmail(): string {//autofills the email
    return this.currentHome.email;
  }
  GetContact(): string {//autofills the contact
    return this.currentHome.contact;
  }
  GetSite(): string {//autofills the website
    return this.currentHome.site;
  }
  GetBeds(): string {//autofills the beds
    return this.currentHome.beds;
  }
  GetStaff(): string {//autofills the staff
    return this.currentHome.staff;
  }
  GetDescription(): string {//autofills the description
    return this.currentHome.description;
  }
  ngOnInit() {
    this.GetCurrentUser();
    this.route.queryParams//gets the id of the current home from the queryParams
      .filter(params => params.id)
      .subscribe(params => {
        if (params['id']) {
          this.GetHome(params.id);//gets the home based on the id from the queryParam
        }
      });
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
  }

}
