import { Component, OnInit } from '@angular/core';
import { User } from "../User";
import { StorageService } from "../storage.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  User: User;
  constructor(private storageService: StorageService) {
    this.GetUser();
  }

  GetUser(): void {
    this.User = this.storageService.getUser();
  }
  CheckUser() {
    this.GetUser();
    if (this.User == null) {
      return true;
    }
    else return false;
  }
  CheckUserNegative() {
    this.GetUser();
    if (this.User != null) {
      return true;
    }
    else return false;
  }
  ngOnInit() {
  }

}
