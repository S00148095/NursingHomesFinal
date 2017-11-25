import { Component, OnInit } from '@angular/core';
import { User } from "../User";
import { StorageService } from "../storage.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  User: User;
  constructor(private storageService: StorageService)
  {
    this.GetUser();
  }

  Logout() {//logs the user out
    this.storageService.Logout();
    this.GetUser();
  }
  GetUser(): void {//gets the current user
    this.User=this.storageService.getUser();
  }
  CheckUser()//checks if login buton should be shown
  {
    this.GetUser();
    if(this.User==null)
    {
      return true;
    }
    else return false;
  }

  CheckUserNegative()//checks if logout buton should be shown
  {
    this.GetUser();
    if(this.User!=null)
    {
      return true;
    }
    else return false;
  }

  ngOnInit() {
  }

}
