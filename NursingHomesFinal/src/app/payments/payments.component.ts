import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { User } from "../User";
import { StorageService } from "../storage.service";
import { Home } from "../Home";
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
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
  @ViewChild('cardInfo') cardInfo: ElementRef;
  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  Total:number;

  constructor(private storageService: StorageService, private cd: ChangeDetectorRef) {
    this.Total=0;
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
  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }
  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      // ...send the token to the your backend to process the charge
    }
  }
  calcPaymentTotal()
  {
    this.Total = myExtObject.calcPaymentTotal();
  }
  ngOnInit() {
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
  }
  ngAfterViewInit() {
    if (this.currentUser != null || this.currentUser != undefined) {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }
  }
  ngOnDestroy() {
    if (this.currentUser != null || this.currentUser != undefined) {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();}
  }
}
