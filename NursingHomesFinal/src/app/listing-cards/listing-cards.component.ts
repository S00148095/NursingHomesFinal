import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-listing-cards',
  templateUrl: './listing-cards.component.html',
  //inputs: ['county', 'amount'],
  styleUrls: ['./listing-cards.component.css']
})
export class ListingCardsComponent implements OnInit {

  //county: string;
  //amount: number;
  homes: Observable<any[]>;

  @Input()
  county: string;

  @Input()
  amount: number;


  constructor(private db: AngularFireDatabase) { 
    //this.GetSomeHomes();
  }

  ngOnInit() {
    this.GetSomeHomes(this.county,this.amount);
  }

  GetSomeHomes(county, amount){
    //gets AMOUNT of homes from COUNTY
    this.homes = this.db.list('homes', ref => ref.orderByChild('county').equalTo(county).limitToLast(amount)).valueChanges();
  }

}
