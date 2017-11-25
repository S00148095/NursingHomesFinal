import { Component, OnInit } from '@angular/core';
import { StorageService } from "../storage.service";
import { Home } from "../Home";

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  inputs: ["Display", "Link"],
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  Homes: Home[];
  Display: string;
  Link: string;
  Home: Home;

  constructor(private storageService: StorageService)
   {
    this.GetHomes();
    }
 
  getLink(): string {//gets the current link ie her the button points to
    return this.Link;
  }
  UpdateCurrentHome(): void {//updates the current home
    this.Home=this.CompareHomes();
    this.storageService.setCurrentHome(this.Home);
  }
  CompareHomes(): Home {//gets the home from the list of homes that fits the correct name
    for (var i = 0; i < this.Homes.length; i++) { 
      if (this.Homes[i].name == this.Display) {
        return this.Homes[i];
      }
    }
    return null;
  }
  GetHomes(): void {//gets the list of homes
    this.storageService.getHomes().then(homes => this.Homes = homes);
  }

  ngOnInit() {
  }
}
