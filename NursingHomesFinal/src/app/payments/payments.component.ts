import { Component, OnInit } from '@angular/core';
import { User } from "../User";
import { StorageService } from "../storage.service";
import { Home } from "../Home";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  counter: number;
  currentUser: User;
  Homes:Home[];
  hasBeenPopped:boolean;

  constructor(private storageService: StorageService) {
    this.counter=0;
    this.GetUser();
    this.Homes=this.currentUser.homes;
  }

  GetUser(): void {
    this.currentUser = this.storageService.getUser();
  }
  ngOnInit() {
  }

}
