import { Component, OnInit } from '@angular/core';
import { User } from "../User";
import { StorageService } from "../storage.service";
import { Home } from "../Home";
import { Router } from '@angular/router';

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

  constructor(private storageService: StorageService, private router: Router) {
    this.GetUser();
  }

  CheckHome() {
    if (this.currentUser != null || this.currentUser != undefined) {
      this.Homes=this.currentUser.homes;
      return true;
    }
    else {
      this.router.navigateByUrl('/webSide/home');
      return false;
    }
  }
  GetUser(): void {
    this.currentUser = this.storageService.getUser();
  }
  ngOnInit() {
  }

}
