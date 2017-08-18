import { Component, OnInit } from '@angular/core';
import { User } from "../User";
import { StorageService } from "../storage.service";
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  profile: any;
  User: User;
  constructor(private storageService: StorageService, public auth: AuthService) {
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
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
    console.log(this.profile);
  }

}
