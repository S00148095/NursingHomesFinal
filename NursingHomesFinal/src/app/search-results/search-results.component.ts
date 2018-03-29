import { Component, OnInit } from '@angular/core';
import { Home } from "../Home";
import { StorageService } from "../storage.service";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'script.js';
import { Router, ActivatedRoute } from '@angular/router';

declare var myExtObject: any;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  Homes: Home[];
  currentHome: Home;
  lat:number;
  long:number;
  searchParam:string;

  constructor(private storageService: StorageService, private db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    this.Homes = [];
  }
  GetHomes(): void {//gets the list of homes
    this.storageService.getHomes().subscribe(homes => {
      for (var k in homes) {
        if (homes[k].rating == undefined || homes[k].rating == null) {
          homes[k].rating = 0;
        }
        this.Homes.push(homes[k]);
      }
      this.route.queryParams
        .filter(params => params.searchParam)
        .subscribe(params => {
          if (params['searchParam']) {
            this.CalcDistances(params.searchParam);
          }
        });
    });
  }
  Calculate(address) {//calculates the distances to sort by distance
    address = address || 'Dublin, Ireland';
    this.router.navigate(["/webSide/search-results"], { queryParams: { searchParam: address } });
  }
  CalcDistances(address: string) {
    this.storageService.getGeocoding(address).subscribe(data=>{
      this.searchParam=data.results[0].formatted_address;
      this.lat=data.results[0].geometry.location.lat;
      this.long=data.results[0].geometry.location.lng;
      for (var i = 0; i < this.Homes.length; i++) {
        this.Homes[i].distance=this.compareLatLong(this.Homes[i].lat,this.Homes[i].long);
      }
    });
  }
  rad(x) {
    return x * Math.PI / 180;
  }
  compareLatLong(testlat, testlong) {
    var R = 6371; // Earth’s mean radius in meters
    var dLat = this.rad(this.lat - testlat);
    var dLong = this.rad(this.long - testlong);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(this.lat)) * Math.cos(this.rad(testlat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }
  UpdateCurrentHome(Home: Home): void {//sets the current home
    this.storageService.setCurrentHome(Home);
  }
  onNotify(Home: Home): void {//updates the current home
    this.UpdateCurrentHome(Home);
  }
  SortHomes(): void {//sorts the list of homes
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
            if (a.reviews && b.reviews) {
              if (a.reviews.length > b.reviews.length) return -1;
              else if (a.reviews.length <= b.reviews.length) return 1;
              else return 0;
            }
          };
        };
      };
    });
  }
  CheckHomes(): boolean {//checks that the list of homes is not null, then sorts them
    if (this.Homes != null && this.Homes != undefined && this.Homes.length != 0) {
      this.SortHomes();
      return true;
    }
    else return false;
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
  }

}
