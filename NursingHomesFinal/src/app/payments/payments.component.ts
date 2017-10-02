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

  CheckHome() {
    if (this.currentUser != null || this.currentUser != undefined) {
      this.Homes = this.currentUser.homes;
        this.PopBoxes();
      return true;
    }
    else {
      return false;
    }
  }
  GetUser(): void {
    this.currentUser = this.storageService.getUser();
  }
  PopBoxes() {
    for (var i = 0; i < this.Homes.length; i++) {
      myExtObject.PopBoxes(this.Homes[i].name, this.Homes[i].tier);
    }
  }
  CalcTotals() {
    myExtObject.calcPaymentTotal();
  }
  ngOnInit() {
    myExtObject.initFullpage("not home");
  }
}
