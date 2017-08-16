import { Component, OnInit } from '@angular/core';
import { Home } from "../Home";
import { StorageService } from "../storage.service";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  Homes: Home[];
  currentHome: Home;
  searchCriteria: string[];

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
  ngOnInit() {
  }

}
