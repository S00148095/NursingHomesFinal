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
  tier4: number;
  tier3: number;
  tier2: number;
  tier1: number;
  counter: number;
  User: User;
  Homes: Home[] = [];
  Total: number;
  handler: any;
  amount = 500;
  output = [{
    id: "",
    tier: 0
  }]
  term: string;

  constructor(private storageService: StorageService, private paymentSvc: PaymentService) {
    this.Total = 0;
    this.term = "Month";
  }

  CheckHome() {//checks if a user is logged in
    if (this.User != null || this.User != undefined) {
      return true;
    }
    else {
      return false;
    }
  }
  GetUser(): void {//gets thecurrent user
    this.storageService.getUser().subscribe(user => {
      if (user != null) {
        this.User = user;
        for (var k in user.homes) {
          this.Homes.push(user.homes[k]);
        }
        if (this.output[0].id.length == 0) {
          for (var i = 0; i < this.Homes.length; i++) {
            this.output[i] = {
              id: this.Homes[i].ID,
              tier: this.Homes[i].tier
            };
          }
        }
        this.calcTotals();
      }
    });
  }

  calcTotals() {
    try {
      var tier1month = 39;
      var tier2month = 69;
      var tier3month = 99;
      var tier4month = 149;
      var tier1year = 399;
      var tier2year = 699;
      var tier3year = 999;
      var tier4year = 1499;
      var grandtotal = 0;
      var tier1total = 0;
      var tier2total = 0;
      var tier3total = 0;
      var tier4total = 0;
      var tier1 = 0;
      var tier2 = 0;
      var tier3 = 0;
      var tier4 = 0;
      if (this.term == "Month") {
        tier1 = tier1month;
        tier2 = tier2month;
        tier3 = tier3month;
        tier4 = tier4month;
      }
      else if (this.term == "Year") {
        tier1 = tier1year;
        tier2 = tier2year;
        tier3 = tier3year;
        tier4 = tier4year;
      }
      for (var i = 0; i < this.output.length; i++) {
        if (this.output[i].tier == 1) {
          tier1total += tier1;
          grandtotal += tier1;
        }
        else if (this.output[i].tier == 2) {
          tier2total += tier2;
          grandtotal += tier2;
        }
        else if (this.output[i].tier == 3) {
          tier3total += tier3;
          grandtotal += tier3;
        }
        else if (this.output[i].tier == 4) {
          tier4total += tier4;
          grandtotal += tier4;
        }
      }
      this.tier1= tier1total;
      this.tier2= tier2total;
      this.tier3= tier3total;
      this.tier4= tier4total;
      this.Total=grandtotal;
    }
    catch (error) {
      console.log(error);
    }
    finally { }
  }
  calcPaymentTotal(id, tier) {
    for (var i = 0; i < this.output.length; i++) {
      if (this.output[i].id == id)
        this.output[i] = {
          id: id,
          tier: tier
        }
    }
    this.calcTotals();
  }
  updatePaymentTotal(term) {
    this.term = term;
    this.calcTotals();
  }
  handlePayment() {
    this.handler.open({
      name: 'FireStarter',
      excerpt: 'Deposit Funds to Account',
      amount: this.amount
    });
  }
  checkIfChecked(tier, check) {
    if (tier == check) {
      return true;
    }
    else return false;
  }
  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close()
  }
  ngOnInit() {
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page

    this.GetUser();
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      locale: 'auto',
      token: token => {
        this.paymentSvc.processPayment(token, this.output, this.term, this.User.StripeId)
      }
    });
  }
}
