import { Component, OnInit } from '@angular/core';
import { StorageService } from "../storage.service";
import { Home } from "../Home";
import { Router } from "@angular/router";
import 'script.js';

declare var myExtObject: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Homes: Home[];
  searchCriteria: string[];
  lats: number[] = [];
  longs: number[] = [];
  address:string;
  interval:any;

  constructor(private storageService: StorageService, private router: Router) {
    this.GetHomes();
  }

  GetHomes(): void {//gets the list of homes
    this.storageService.getHomes().then(homes => this.Homes = homes);
  }
  GetCriteria(): void {//hets the search criteria
    this.searchCriteria = this.storageService.getCriteria();
  }
  SetCriteria(): void {//sets the searh criteria
    this.storageService.setCriteria(this.searchCriteria);
    this.searchCriteria = [];
  }
  UpdateCriteria(option, county) {//gets the current search criteria and update the storage
    this.searchCriteria = [option, county];
    this.SetCriteria();
  }
  Calculate(address) {//calculates the distances to sort by ditance
    this.address = address || 'Dublin, Ireland';
    for (var i = 0; i < this.Homes.length; i++) {
      this.lats.push(this.Homes[i].lat);
      this.longs.push(this.Homes[i].long);
    }
    myExtObject.CalculateDistance(this.address, this.lats, this.longs);
    this.interval = setInterval(() => {
      this.checkCheck();
      }, 400);
  }
  checkCheck() {//checks if the external javascript is finished running
    switch(myExtObject.checkFinished()) {
      case false:
      break;
      case true:      
      clearInterval(this.interval);
      this.UpdateCriteria("distance", "");
      this.storageService.updateAddress(this.address);
      this.storageService.updateCheck(true);
      this.router.navigateByUrl('/webSide/search-results');
      break;
    }
  }
  ngOnInit() {
    myExtObject.initFullpage("home");//tells the full page plugin to fire on this page
  }

}
