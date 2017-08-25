import { Component, OnInit } from '@angular/core';
import { Home } from "../Home";
import { StorageService } from "../storage.service";
import 'script.js';

declare var myExtObject: any;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  Homes: Home[];
  currentHome: Home;
  searchCriteria: string[];
  GetData: any[] = [];

  constructor(private storageService: StorageService) {
    this.GetHomes();
    this.GetCriteria();
  }
  GetHomes(): void {
    this.storageService.getHomes().then(homes => this.Homes = homes);
  }
  UpdateCurrentHome(Home: Home): void {
    this.storageService.setCurrentHome(Home);
  }
  GetCriteria(): void {
    this.searchCriteria = this.storageService.getCriteria();
  }
  SetCriteria(): void {
    this.storageService.setCriteria(this.searchCriteria);
  }
  onNotify(Home: Home): void {
    this.UpdateCurrentHome(Home);
  }
  SortHomes(): void {
    console.log("sort");
    switch (this.searchCriteria[0]) {
      case "reviews":
        this.Homes.sort((a, b) => {
          if (a.reviews.length > b.reviews.length) return -1;
          else if (a.reviews.length < b.reviews.length) return 1;
          else {
            if (a.tier == 3) return -1;
            else if (b.tier == 3) return 1;
            else return 0;
          }
        });
        break;
      case "distance":
      console.log("sort");
        if (this.storageService.getNeedsACheck()) {
          this.RetrieveData(this.storageService.getAddress());
        }
        this.Homes.sort((a, b) => {
          if (a.distance < b.distance) return -1;
          else if (a.distance > b.distance) return 1;
          else {
            if (a.rating > b.rating) {
              return -1;
            }
            else if (a.rating < b.rating) {
              return 1;
            }
            else return 0;
          };
        });
        break;
      case "descending":
        this.Homes.sort((a, b) => {
          if (a.name > b.name) return -1;
          else if (a.name < b.name) return 1;
          else {
            if (a.tier == 3) return -1;
            else if (b.tier == 3) return 1;
            else return 0;
          }
        });
        break;
      case "ascending":
        this.Homes.sort((a, b) => {
          if (b.name > a.name) return -1;
          else if (b.name < a.name) return 1;
          else {
            if (a.tier == 3) return -1;
            else if (b.tier == 3) return 1;
            else return 0;
          }
        });
        break;
      default:
        this.Homes.sort((a, b) => {
          if (a.rating > b.rating) {
            return -1;
          }
          else if (a.rating < b.rating) {
            return 1;
          }
          else {
            if (a.tier == 3) return -1;
            else if (b.tier == 3) return 1;
            else {
              if (a.reviews.length > b.reviews.length) return -1;
              else if (a.reviews.length < b.reviews.length) return 1;
              else return 0;
            }
          }
        });
    }
  }
  CheckHomes(): boolean {
    if (this.Homes != null && this.Homes != undefined && this.searchCriteria != null && this.searchCriteria != undefined) {
      this.SortHomes();
      return true;
    }
    else return false;
  }
  UpdateCriteria(option, county) {
    this.searchCriteria = [option, county];
  }
  RetrieveData(address) {
    for (var i = 0; i < this.Homes.length; i++) {
      this.GetData[i] = [];
      this.GetData[i].push(this.Homes[i].lat);
      this.GetData[i].push(this.Homes[i].long);
      this.GetData[i].push(10);
    }
    this.GetData = myExtObject.RetrieveData(address, this.GetData);
    for (var i = 0; i < this.Homes.length; i++) {
      for (var j = 0; j < this.GetData.length; j++) {
        if (this.GetData[j][0] == this.Homes[i].lat && this.GetData[j][1] == this.Homes[i].long) {
          this.Homes[i].distance = this.GetData[j][2];
        }
      }
    }
    this.storageService.updateHomes(this.Homes);
    myExtObject.ClearData();
    this.storageService.updateCheck(false);
    console.log("values checked-ts");
  }
  ngOnInit() {
  }

}
