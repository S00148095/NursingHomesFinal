import { Component, OnInit } from '@angular/core';
import { User } from "../User";
import { StorageService } from "../storage.service";
import { Home } from "../Home";
import { Router } from '@angular/router';
import 'script.js';

declare var myExtObject: any;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  counter: number;
  currentUser: User;
  Homes: Home[];

  constructor(private storageService: StorageService) {
    this.GetUser();
  }

  CheckHome() {//checks if a user is logged in
    if (this.currentUser != null || this.currentUser != undefined) {
      this.Homes = this.currentUser.homes;
        this.PopBoxes();
      return true;
    }
    else {
      return false;
    }
  }
  GetUser(): void {//gets thecurrent user
    this.currentUser = this.storageService.getUser();
  }
  PopBoxes() {//populates the check boxes
    for (var i = 0; i < this.Homes.length; i++) {
      myExtObject.PopBoxes(this.Homes[i].name, this.Homes[i].tier);
    }
  }
  CalcTotals() {//calculates the totals
    myExtObject.calcPaymentTotal();
  }
  ngOnInit() {
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
  }
}
