import { Component, OnInit } from '@angular/core';
import { StorageService } from "../storage.service";
import { Home } from "../Home";
import { Router } from "@angular/router";
import 'script.js';
import {Observable} from 'rxjs/Rx';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

declare var myExtObject: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  Homes: Home[]=[];
  hGroup: Observable<any[]>;
  bg: any;
  searchCriteria: string[];
  lats: number[] = [];
  longs: number[] = [];
  address:string;
  interval:any;

  countys: string = "Sligo";
  amounts: number = 3;

  constructor(private db: AngularFireDatabase, private storageService: StorageService, private router: Router, private firebaseApp: FirebaseApp) {
    this.GetHomes();
    this.GetSomeHomes('Sligo', 3);//we'll make this a random county or something when we get more homes in our database
  }

  GetSomeHomes(county, amount){
    //gets AMOUNT of homes from COUNTY
    //this needs to be redone to return homes
    this.hGroup = this.db.list('homes', ref => ref.orderByChild('county').equalTo(county).limitToLast(amount)).valueChanges();
  }

  GetHomes(): void {//gets the list of homes
    this.storageService.getHomes().subscribe(homes => { 
      for (var key in homes) {
        this.Homes.push(homes[key]);
      }
  });
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
    if(window.screen.width > 767){
      myExtObject.initFullpage("home");//tells the full page plugin to fire on this page if on desktop/laptop
    }
  }

}
