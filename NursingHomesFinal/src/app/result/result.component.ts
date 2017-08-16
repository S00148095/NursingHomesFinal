import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Home } from "../Home";
import { Review } from "../Review";
import { StorageService } from "../storage.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  inputs: ["Home", "County"],
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  Home: Home;
  topReview:Review;
  County: string;
  NumReviews: string;
  @Output() notify: EventEmitter<Home> = new EventEmitter<Home>();

  constructor(private storageService: StorageService) {
  }
  checkHomeReviews() {
    if (this.Home != null) {
      this.UpdateNumReviews();
      return true
    }
    else return false
  }
  UpdateNumReviews() {
    if (this.Home.reviews.length > 1 || this.Home.reviews.length == 0)
      this.NumReviews = this.Home.reviews.length + " Reviews";
    else this.NumReviews = this.Home.reviews.length + " Review";
  }
  UpdateCurrentHome() {
    this.notify.emit(this.Home);
  }
  CheckCounty() {
    if (this.County == this.Home.county || this.County == "") {
      return true;
    }
    else return false;
  }
  CheckPremium() {
    if (this.CheckCounty()) {
      if (this.Home.tier == 3) {
        return true;
      }
      else return false
    }
    else return false
  }
  CheckTier() {
    if (this.Home.tier > 1) {
      this.UpdateReviews();
      return true
    }
    else return false
  }
  UpdateReviews() {
    this.SortReviews();
    this.topReview=this.Home.reviews[0];
  }
  SortReviews() {
    this.Home.reviews.sort((a, b) => {
      if (a.overall > b.overall) return -1;
      else if (a.overall < b.overall) return 1;
      else return 0;
    });
  }
  CheckRating(rating: number): string {
    if (this.Home.rating / 2 >= rating) return "yellow star icon"
    else if (this.Home.rating / 2 <= rating - 1) return "empty yellow star icon"
    else return "yellow star half empty icon"
  }
  SelectedStyle(): string {
    if (this.Home.tier == 3) {
      return "3px solid #FFD700"
    }
    else {
      return ""
    }
  }
  ngOnInit() {
  }

}
