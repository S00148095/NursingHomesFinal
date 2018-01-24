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
        this.PopBoxes();
        if (this.output[0].id.length == 0) {
          for (var i = 0; i < this.Homes.length; i++) {
            this.output[i] = {
              id: this.Homes[i].ID,
              tier: this.Homes[i].tier
            };
          }
        }
      }
    });
  }
  PopBoxes() {//populates the check boxes
    for (var i = 0; i < this.Homes.length; i++) {
      myExtObject.PopBoxes(this.Homes[i].name, this.Homes[i].tier);
    }
  }
  calcPaymentTotal(id, tier) {
    for (var i = 0; i < this.output.length; i++) {
      if (this.output[i].id == id)
        this.output[i] = {
          id: id,
          tier: tier
        }
    }
    this.Total = myExtObject.calcPaymentTotal();
  }
  updatePaymentTotal(term) {
    this.term = term;
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
    this.GetUser();
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page

    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      locale: 'auto',
      token: token => {
        this.paymentSvc.processPayment(token, this.output, this.term, "cus_BzVYqP5U6Fowua")
      }
    });
  }
}
