import { Component, OnInit } from '@angular/core';
import { Home } from "../Home";
import { StorageService } from "../storage.service";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
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

  constructor(private storageService: StorageService, private db: AngularFireDatabase) {
    this.Homes = [];
  }
  GetHomes(): void {//gets the list of homes
    this.storageService.getHomes().subscribe(homes => {
      for (var k in homes) {
        this.Homes.push(homes[k]);
      }
    });
  }
  UpdateCurrentHome(Home: Home): void {//sets the current home
    this.storageService.setCurrentHome(Home);
  }
  GetCriteria(): void {//gets the search criteria
    this.searchCriteria = this.storageService.getCriteria();
  }
  SetCriteria(): void {//sets the search criteria
    this.storageService.setCriteria(this.searchCriteria);
  }
  onNotify(Home: Home): void {//updates the current home
    this.UpdateCurrentHome(Home);
  }
  SortHomes(): void {//sorts the list of homes
    switch (this.searchCriteria[0]) {
      case "reviews":
        this.Homes.sort((a, b) => {
          if(a.reviews && b.reviews){
            if (a.reviews.length > b.reviews.length) return -1;
            else if (a.reviews.length < b.reviews.length) return 1;
            else {
              if (a.tier > b.tier) return -1;
              else if (b.tier > a.tier) return 1;
              else return 0;
            }
          }
        });
        break;
      case "distance":
        if (this.storageService.getNeedsACheck()) {
          this.RetrieveData(this.storageService.getAddress());
        }
        this.Homes.sort((a, b) => {
          if (this.getCategory(a.distance) < this.getCategory(b.distance)) return -1;
          else if (this.getCategory(a.distance) > this.getCategory(b.distance)) return 1;
          else {
            if (a.rating > b.rating) {
              return -1;
            }
            else if (a.rating < b.rating) {
              return 1;
            }
            else {
              if (a.tier > b.tier) return -1;
              else if (b.tier > a.tier) return 1;
              else {
                if(a.reviews && b.reviews){
                  if (a.reviews.length > b.reviews.length) return -1;
                  else if (a.reviews.length <= b.reviews.length) return 1;
                  else return 0;
                }
              };
            };
          };
        });
        break;
      case "descending":
        this.Homes.sort((a, b) => {
          if (a.name > b.name) return -1;
          else if (a.name < b.name) return 1;
          else {
            if (a.tier > b.tier) return -1;
            else if (b.tier > a.tier) return 1;
            else return 0;
          }
        });
        break;
      case "ascending":
        this.Homes.sort((a, b) => {
          if (b.name > a.name) return -1;
          else if (b.name < a.name) return 1;
          else {
            if (a.tier > b.tier) return -1;
            else if (b.tier > a.tier) return 1;
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
            if (a.tier > b.tier) return -1;
            else if (b.tier > a.tier) return 1;
            else {
              if(a.reviews && b.reviews){
                if (a.reviews.length > b.reviews.length) return -1;
                else if (a.reviews.length <= b.reviews.length) return 1;
                else return 0;
              }
            }
          }
        });
    }
  }
  CheckHomes(): boolean {//checks that the list of homes is not null, then sorts them
    if (this.Homes != null && this.Homes != undefined && this.Homes.length != 0 && this.searchCriteria != null && this.searchCriteria != undefined) {
      this.SortHomes();
      return true;
    }
    else return false;
  }
  UpdateCriteria(option, county) {//updates the search criteria
    this.searchCriteria = [option, county];
  }
  RetrieveData(address) {//retrieves the distance data from local storage
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
    myExtObject.ClearData();
    this.storageService.updateCheck(false);
  }
  getCategory(distance)//checks how far the home is away
  {
    if (distance < 5) {
      return 0;
    }
    else if (distance < 10) {
      return 1;
    }
    else if (distance < 20) {
      return 2;
    }
    else if (distance < 50) {
      return 3;
    }
    else if (distance < 100) {
      return 4;
    }
    else {
      return 5;
    }
  }
  ngOnInit() {
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
    this.GetHomes();
    this.GetCriteria();
  }

}
