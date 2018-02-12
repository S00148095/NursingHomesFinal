import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Home } from "../Home";
import { User } from "../User";
import { StorageService } from "../storage.service";
import 'script.js';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Image } from '../Image';
import { ToastsManager } from 'ng2-toastr';

declare var myExtObject: any;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  currentHome: Home;
  User: User;
  to: string;
  from: string;
  subject: string;
  resident: string;
  phone: string;
  details: string;
  honeypot: string="";

  constructor(private storageService: StorageService, private route: ActivatedRoute, private afa: AngularFireAuth, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.GetUser();
  }

  GetHome(id): void {//gets the current home from the service(ie the one the user just came from if applicable) to autofill their details
    if (id != "careze") {
      this.storageService.getCurrentHome(id).subscribe(home => {
        this.currentHome = home;
      });
    }
    else {
      this.currentHome = new Home("careze", "", "careze.com", "Sligo", "Co. Sligo", "", 0, "0878111111", "declan@careze.com", "Declan Trumble", "", "", "", "", "", [], [], 0, [], 0, 0, 0, new Image("", ""));
    }
    this.to = this.currentHome.email;
  }
  GetUser(): void {//gets the current user from the service
    this.afa.authState.subscribe((resp) => {
      if (resp != null) {
        if (resp.uid) {
          this.storageService.getUser(resp.uid).subscribe(user => {
            this.User = user;
            this.from = this.User.email;
          });
        }
      }
    });
  }
  CheckHome(): boolean {//shows the address etc of the current home if applicable
    if (this.currentHome != null) return true;
    else return false;
  }
  CheckUserEmail(): string {//autofills email if a user is logged in
    if (this.User != null) return this.User.email;
    else return "";
  }
  CheckHomeEmail(): string {//autofills the home's email ig applicable
    if (this.currentHome != null) return this.currentHome.email;
    else return "";
  }
  SendEmail() {
    if (this.honeypot.length == 0) {
      if (this.to != null && this.to != undefined && this.to != "" && this.from != null && this.from != undefined && this.from != "" && this.subject != null && this.subject != undefined && this.subject != "" && this.resident != null && this.resident != undefined && this.resident != "" && this.phone != null && this.phone != undefined && this.phone != "" && this.details != null && this.details != undefined && this.details != "") {
        this.storageService.SendEmail(this.to, this.from, this.subject, this.resident, this.phone, this.details);
        this.subject=this.resident=this.phone=this.details="";
      }
      else{
      this.toastr.warning("Please fill out all the fields");
    }
    }
    this.subject=this.resident=this.phone=this.details="";
  }
  ngOnInit() {
    this.route.queryParams//gets the id of the current recipe from the queryParams
      .filter(params => params.id)
      .subscribe(params => {
        if (params['id']) {
          this.GetHome(params.id);//gets the recipe based on the id from the queryParam
        }
      });
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
  }

}
