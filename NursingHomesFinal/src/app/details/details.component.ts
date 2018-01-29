import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Home } from "../Home";
import { Review } from "../Review";
import { User } from "../User";
import { StorageService } from "../storage.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'script.js';
import { AngularFireAuth } from 'angularfire2/auth';
import { v4 as uuid } from 'uuid';

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
  User: User;
  ratio: string;
  gcd: number;
  values: any[] = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' }
  ];

  constructor(private afa: AngularFireAuth, private storageService: StorageService, private router: Router, private route: ActivatedRoute, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);//sets the view container that the toasts will appear in
    this.Reviews = [];
  }
  GetHome(id): void {//gets current home
    this.storageService.getCurrentHome(id).subscribe(home => {
      this.currentHome = home;
      this.GetReviews();
    });
  }
  GetReviews(): void {//gets the reviews associated with the current home
    this.Reviews = [];
    if (this.currentHome != null) {
      this.calculateRatio();
      for (var k in this.currentHome.reviews) {
        this.Reviews.push(this.currentHome.reviews[k]);
      }
    }
  }
  calculateRatio(): void {//calculates the bed:staff ratio 
    this.gcd = this.GCD(parseFloat(this.currentHome.beds), parseFloat(this.currentHome.staff));
    this.ratio = parseFloat(this.currentHome.beds) / this.gcd + ":" + parseFloat(this.currentHome.staff)
  }
  GCD(a, b): number {//calculates the greatest common denominator
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
  CheckHome() {//if the current home is not null it calls javascript to populate care ypes, facilities and initialise semantic ui tabs
    if (this.currentHome != null || this.currentHome != undefined) {
      myExtObject.PopulateCare(this.currentHome.careTypes);
      myExtObject.Populate(this.currentHome.facilities);
      myExtObject.InitTabs();
      return true;
    }
    else {//if the home is for some reason null it redirects back to the home page
      return false;
    }
  }
  //leaves a review, refreshes the list of reviews and informs the user that their review was left successfully 
  LeaveReview(criteria1, criteria2, criteria3, criteria4, criteria5, criteria6, criteria7, criteria8, criteria9, criteria10, criteria11, criteria12, comment) {
    if (this.User != null && this.User != undefined && criteria1 != "" && criteria2 != "" && criteria3 != "" && criteria4 != "" && criteria5 != "" && criteria6 != "" && criteria7 != "" && criteria8 != "" && criteria9 != "" && criteria10 != "" && criteria11 != "" && criteria12 != "" && comment != "") {
      this.newReview = new Review(uuid(), this.User.email , criteria1, criteria2, criteria3, criteria4, criteria5, criteria6, criteria7, criteria8, criteria9, criteria10, criteria11, criteria12, Math.round((parseFloat(criteria1) + parseFloat(criteria2) + parseFloat(criteria3) + parseFloat(criteria4) + parseFloat(criteria5) + parseFloat(criteria6) + parseFloat(criteria7) + parseFloat(criteria8) + parseFloat(criteria9) + parseFloat(criteria10) + parseFloat(criteria11) + parseFloat(criteria12)) / 12), comment, [], [], "");
      this.storageService.UpdateReviews(this.currentHome,this.newReview);
      this.GetReviews();
      myExtObject.Clear();
      this.showSuccess();
    }
    else if (this.User == null || this.User == undefined) {//shows a toast asking the user to log in
      this.showWarningLogIn();
    }
    else {//shows a toast informing the user that they need to fill out the fields
      this.showWarningContent();
    }
  }
  GetUser(): void {//gets current user
    this.afa.authState.subscribe((resp) => {
      if (resp != null) {
        if (resp.uid) {
          this.storageService.getUser(resp.uid).subscribe(user => {
            this.User = user;
          });
        }
      }
    });
  }
  SortReviews(Reviews: Review[]): Review[] {//sorts the reviews by agreed-nees work
    switch (Reviews) {
      default:
        Reviews.sort((a, b) => {
          if (a.agreed.length > b.agreed.length) return -1;
          else if (a.agreed.length < b.agreed.length) return 1;
          else return 0;
        });
        return Reviews
    }
  }
  showSuccess() {//shows a toast
    this.toastr.success('Your review was left succesfully!', 'Thanks!');
  }
  showWarningLogIn() {//shows a toast
    this.toastr.warning('You must be logged in to leave a review.', 'Sorry!');
  }
  showWarningContent() {//shows a toast
    this.toastr.warning('You must fill out all of the fields.', 'Sorry!');
  }
  UpdateCurrentHome() {//updates the current home when one is clicked on
    this.router.navigate(["/webSide/contact"], { queryParams: { id: this.currentHome.ID } });//navigates to the details page and sets the queryParams
  }
  ngOnInit() { 
    this.GetUser();
    this.route.queryParams//gets the id of the current home from the queryParams
      .filter(params => params.id)
      .subscribe(params => {
        if (params['id']) {
          this.GetHome(params.id);//gets the home based on the id from the queryParam
        }
      });
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
  }

}
