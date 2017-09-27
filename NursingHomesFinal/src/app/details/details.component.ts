import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Home } from "../Home";
import { Review } from "../Review";
import { User } from "../User";
import { StorageService } from "../storage.service";
import { Router } from "@angular/router";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'script.js';

declare var myExtObject: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  currentHome: Home;
  Reviews: Review[];
  newReview: Review;
  currentUser: User;
  ratio: string;
  gcd: number;
  values: any[] = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' }
  ];

  constructor(private storageService: StorageService, private router: Router,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.GetReviews();
    this.toastr.setRootViewContainerRef(vcr);
  }
  GetHome(): void {
    this.currentHome = this.storageService.getCurrentHome();
  }
  GetReviews(): void {
    this.Reviews = [];
    this.GetHome();
    if (this.currentHome != null) {
      this.calculateRatio();
      this.Reviews = this.currentHome.reviews;
      this.Reviews = this.SortReviews(this.Reviews);
      this.currentHome.reviews = this.SortReviews(this.currentHome.reviews);
    }
  }
  calculateRatio(): void {
    this.gcd = this.GCD(parseFloat(this.currentHome.beds), parseFloat(this.currentHome.staff));
    this.ratio = parseFloat(this.currentHome.beds) / this.gcd + ":" + parseFloat(this.currentHome.staff)
  }
  GCD(a, b): number {
    while (a != 0 && b != 0) {
      if (a > b)
        a %= b;
      else
        b %= a;
    }
    if (a == 0)
      return b;
    else
      return a;
  }
  CheckHome() {
    this.GetHome();
    if (this.currentHome != null || this.currentHome != undefined) {
      myExtObject.PopulateCare(this.currentHome.careTypes);
      myExtObject.Populate(this.currentHome.facilities);
      myExtObject.InitTabs();
      return true;
    }
    else {
      this.Redirect();
      return false;
    }
  }
  Redirect(): void {
    this.router.navigateByUrl('/webSide/home');
  }
  LeaveReview(criteria1, criteria2, criteria3, criteria4, criteria5, criteria6, criteria7, criteria8, criteria9, criteria10, criteria11, criteria12, comment) {
    this.GetUser();
    if (this.currentUser != null && this.currentUser != undefined && criteria1 != "" && criteria2 != "" && criteria3 != "" && criteria4 != "" && criteria5 != "" && criteria6 != "" && criteria7 != "" && criteria8 != "" && criteria9 != "" && criteria10 != "" && criteria11 != "" && criteria12 != "" && comment != "") {
      this.newReview = new Review(this.currentUser.fName + " " + this.currentUser.sName[0], criteria1, criteria2, criteria3, criteria4, criteria5, criteria6, criteria7, criteria8, criteria9, criteria10, criteria11, criteria12, Math.round((parseFloat(criteria1) + parseFloat(criteria2) + parseFloat(criteria3) + parseFloat(criteria4) + parseFloat(criteria5) + parseFloat(criteria6) + parseFloat(criteria7) + parseFloat(criteria8) + parseFloat(criteria9) + parseFloat(criteria10) + parseFloat(criteria11) + parseFloat(criteria12)) / 12), comment, 0, 0, "");
      this.storageService.UpdateReviews(this.newReview);
      this.GetReviews();
      myExtObject.Clear();
      this.showSuccess();
    }
    else if(this.currentUser == null || this.currentUser == undefined )
    {
      this.showWarningLogIn();
    }
    else
    {
      this.showWarningContent();
    }
  }
  GetUser(): void {
    this.currentUser = this.storageService.getUser();
  }
  SortReviews(Reviews: Review[]): Review[] {
    switch (Reviews) {
      default:
        Reviews.sort((a, b) => {
          if (a.agreed > b.agreed) return -1;
          else if (a.agreed < b.agreed) return 1;
          else return 0;
        });
        return Reviews
    }
  }
  showSuccess() {
    this.toastr.success('Your review was left succesfully!', 'Thanks!');
  }
  showWarningLogIn() {
    this.toastr.warning('You must be logged in to leave a review.', 'Sorry!');
  }
  showWarningContent() {
    this.toastr.warning('You must fill out all of the fields.', 'Sorry!');
  }
  ngOnInit() {
  }

}
