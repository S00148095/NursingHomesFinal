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
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  Homes: Home[]=[];
  hGroup: Observable<any[]>;
  bg: any;

  countys: string = "Sligo";
  amounts: number = 3;

  constructor(private db: AngularFireDatabase, private storageService: StorageService, private router: Router, private firebaseApp: FirebaseApp) {
    this.GetHomes();
    //this.GetSomeHomes('Sligo', 3);//we'll make this a random county or something when we get more homes in our database
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
  Calculate(address) {//calculates the distances to sort by ditance
    address = address || 'Dublin, Ireland';
    this.router.navigate(["/webSide/search-results"], { queryParams: { searchParam: address} });   
  }
  ngOnInit() {
    if(window.screen.width > 767){
      myExtObject.initFullpage("home");//tells the full page plugin to fire on this page if on desktop/laptop
    }
  }

  moveDown(){
    $.fn.fullpage.moveSectionDown();
  }

}
