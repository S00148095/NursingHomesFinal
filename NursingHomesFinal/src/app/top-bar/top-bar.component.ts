import { Component, OnInit } from '@angular/core';
import { User } from "../User";
import { StorageService } from "../storage.service";
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  login: boolean;
  itemId: number;
  constructor(public firebaseAuth: AngularFireAuth, private route: ActivatedRoute, public authService: AuthService, public router: Router, private service: StorageService) {
    this.login = false;
    this.route.params.subscribe(params => {
      this.itemId = +params['id'];
      console.log(this.itemId);
    });
  }

  CheckLogin(): boolean {
    return !this.login;
  }
  CheckLogOut(): boolean {
    return this.login;
  }
  Logout() {//logs the user out, including clearing data from the service
    this.authService.logout();
    this.login=false;
    this.router.navigateByUrl("/");
  }
  CheckUser() {//checks if the user is logged in
    this.firebaseAuth.authState.subscribe((resp) => {
      if (resp != null) {
        if (resp.uid) {
          this.login = true;
        }
        else{this.login=false;}
      }
      else{this.login=false;}
    });
  }

  ngOnInit() {
    this.CheckUser();
  }

}
