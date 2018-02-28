import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import 'script.js';

declare var myExtObject: any;

@Component({
  selector: 'app-create-home',
  templateUrl: './create-home.component.html',
  styleUrls: ['./create-home.component.css']
})
export class CreateHomeComponent implements OnInit {
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
  name: string;
  address: string;
  county: string;
  country: string;
  phone: string;
  email: string;
  contact: string;
  site: string;
  hiqa: string;
  beds: string;
  staff: string;
  description: string;
  constructor(private storageService: StorageService) { }

  ToggleFacility(id) {
    for (var i = 0; i < this.facilities.length; i++) {
      if (id == this.facilities[i].id) {
        this.facilities[i].value = !this.facilities[i].value;
      }
    }
  }
  ToggleCare(id) {
    for (var i = 0; i < this.careTypes.length; i++) {
      if (id == this.careTypes[i].id) {
        this.careTypes[i].value = !this.careTypes[i].value;
      }
    }
  }
  UpdateHome() {
    this.storageService.SubmitNewHome(this.name, this.address, this.county, this.country, this.phone, this.email, this.contact, this.site, this.hiqa, this.beds, this.staff, this.description, this.facilities, this.careTypes);
    this.name = this.address = this.county = this.country = this.phone = this.email = this.contact = this.site = this.hiqa = this.beds = this.staff = this.description= "";
  }
  ngOnInit() {
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
  }

}
