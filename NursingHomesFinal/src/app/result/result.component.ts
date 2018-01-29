import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Home } from "../Home";
import { Review } from "../Review";
import { StorageService } from "../storage.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  inputs: ["Home", "County"],
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  Home: Home;
  topReview: Review;
  reviews:Review[]=[];
  County: string;
  NumReviews: string;
  @Output() notify: EventEmitter<Home> = new EventEmitter<Home>();

  constructor(private storageService: StorageService,private router: Router) {
  }
  checkHomeReviews() {//checks the home isn't null
    if (this.Home != null) {
      this.UpdateNumReviews();
      return true
    }
    else return false
  }
  UpdateNumReviews() {//updates the number of reviews
    this.reviews=[];
    for (var k in this.Home.reviews) {
      this.reviews.push(this.Home.reviews[k]);
    }
    if (this.reviews.length > 1 || this.reviews.length == 0)
      this.NumReviews = this.reviews.length + " Reviews";
    else this.NumReviews = this.reviews.length + " Review";
  }
  UpdateCurrentHome() {//updates the current home when one is clicked on
    this.router.navigate(["/webSide/details"], { queryParams: { id: this.Home.ID } });//navigates to the details page and sets the queryParams
  }
  CheckCounty() {//checks the county
    if (this.County == this.Home.county || this.County == "") {
      return true;
    }
    else return false;
  }
  CheckPremium() {//checks premium
    if (this.CheckCounty()) {
      if (this.Home.tier == 5) {
        return true;
      }
      else return false
    }
    else return false
  }
  CheckTier() {//shows the number of revies on paid versions
    if (this.Home.tier > 1) {
      this.UpdateReviews();
      return true
    }
    else return false
  }
  UpdateReviews() {//sorts reviews and shows the top one
    this.SortReviews();
    this.topReview = this.Home.reviews[0];
  }
  SortReviews() {//sorts reviews
    this.Home.reviews.sort((a, b) => {
      if (a.overall > b.overall) return -1;
      else if (a.overall < b.overall) return 1;
      else return 0;
    });
  }
  CheckRating(rating: number): string {//displays stars
    if (this.Home.rating >= rating) return "yellow star icon"
    else if (this.Home.rating <= rating - 1) return "empty yellow star icon"
    else return "yellow star half empty icon"
  }
  SelectedStyle(): string {//if a home is top three tier show gold border
    if (this.Home.tier >= 3) {
      return "3px solid #FFD700"
    }
    else {
      return ""
    }
  }
  getDistanceCategory()//shows how far away a home is
  {
    if (this.Home.distance < 5) {
      return "<5km away";
    }
    else if (this.Home.distance < 10) {
      return "<10km away";
    }
    else if (this.Home.distance < 20) {
      return "<20km away";
    }
    else if (this.Home.distance < 50) {
      return "<50km away";
    }
    else if (this.Home.distance < 100) {
      return "<100km away";
    }
    else {
      return ">100km away";
    }
  }
  ngOnInit() {
  }

}
