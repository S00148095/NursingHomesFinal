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
  CheckHome(): boolean {
    if (this.currentHome != null || this.currentHome != undefined) {
      this.PopulateFacilities();
      if (this.currentHome.userID == this.currentUser.email) return true;
      else this.Redirect();
    }
    else {
      return false;
    }
  }
  PopulateFacilities(): void {
    this.facilities.forEach(element => {
      element.value=this.currentHome.facilities[element.id];
    });
    this.careTypes.forEach(element => {
      element.value=this.currentHome.careTypes[element.id];
    });
  }
  Redirect(): void {
    this.router.navigateByUrl('/home');
  }
  GetName(): string {
    return this.currentHome.name;
  }
  GetAddress(): string {
    return this.currentHome.address;
  }
  GetCounty(): string {
    return this.currentHome.county;
  }
  GetCountry(): string {
    return this.currentHome.country;
  }
  GetPhone(): string {
    return this.currentHome.phone;
  }
  GetEmail(): string {
    return this.currentHome.email;
  }
  GetContact(): string {
    return this.currentHome.contact;
  }
  GetSite(): string {
    return this.currentHome.site;
  }
  GetBeds(): string {
    return this.currentHome.beds;
  }
  GetStaff(): string {
    return this.currentHome.staff;
  }
  GetDescription(): string {
    return this.currentHome.description;
  }
  CheckID(test): boolean {
    if (test%5==0&&test!=0) return true
    else return false
  }
  ngOnInit() {
  }

}
