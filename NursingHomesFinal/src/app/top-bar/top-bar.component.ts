import { Component, OnInit } from '@angular/core';
import { User } from "../User";
import { StorageService } from "../storage.service";



import { AuthService } from '../auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  User: User;
  constructor(private storageService: StorageService, public auth: AuthService)
  {
    this.GetUser();
    auth.handleAuthentication();
  }

  Logout() {
    this.storageService.Logout();
    this.GetUser();
  }
  GetUser(): void {
    this.User=this.storageService.getUser();
  }
  CheckUser()
  {
    this.GetUser();
    if(this.User==null)
    {
      return true;
    }
    else return false;
  }

  CheckUserNegative()
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
