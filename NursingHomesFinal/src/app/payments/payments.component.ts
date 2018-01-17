import { Component, OnInit, HostListener } from '@angular/core';
import { User } from "../User";
import { StorageService } from "../storage.service";
import { Home } from "../Home";
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';
import 'script.js';
import { environment } from '../../environments/environment';

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
  Total: number;
  handler: any;
  amount = 500;
  output = [{
    id: "",
    tier: 0
  }]

  constructor(private storageService: StorageService, private paymentSvc: PaymentService) {
    this.Total = 0;
    this.GetUser();
  }

  CheckHome() {//checks if a user is logged in
    if (this.currentUser != null || this.currentUser != undefined) {
      this.Homes = this.currentUser.homes;
      this.PopBoxes();
      if (this.output[0].id.length==0) {
        for (var i = 0; i < this.Homes.length; i++) {
          this.output[i] = {
            id: this.Homes[i].ID,
            tier: this.Homes[i].tier
          };
        }
      }
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
  calcPaymentTotal(id, tier) {
    console.log(id + " " + tier);
    for (var i = 0; i < this.output.length; i++) {
      if (this.output[i].id == id)
        this.output[i] = {
          id: id,
          tier: tier
        }
    }
    this.Total = myExtObject.calcPaymentTotal();
  }
  handlePayment() {
    this.handler.open({
      name: 'FireStarter',
      excerpt: 'Deposit Funds to Account',
      amount: this.amount
    });
  }
  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close()
  }

  ngOnInit() {
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page

    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'http://www.clker.com/cliparts/k/O/n/2/Z/d/house-logo-teal-th.png',
      locale: 'auto',
      token: token => {
        this.paymentSvc.processPayment(token, this.output)
      }
    });
  }
}
