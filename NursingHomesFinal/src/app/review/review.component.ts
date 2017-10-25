import { Component, OnInit } from '@angular/core';
import { User } from "../User";
import { Review } from "../Review";
import { Home } from "../Home";
import { StorageService } from "../storage.service";
import 'script.js';

declare var myExtObject: any;

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  inputs: ["Review", "Tier", "Home"],
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  User: User;
  Review: Review;
  Tier: number;
  Home: Home;
  ID: number;
  constructor(private storageService: StorageService) {
    this.GetUser();
  }
  CheckRating(rating: number): string {
    if (this.Review.overall >= rating) return "yellow star icon"
    else if (this.Review.overall <= rating - 1) return "empty yellow star icon"
    else return "yellow star half empty icon"
  }
  GetUser(): void {
    this.User = this.storageService.getUser();
  }
  IncrementAgreed() {
    this.Review.agreed++;
  }
  IncrementDisagreed() {
    this.Review.disagreed++;
  }
  CheckValid(): boolean {
    if (this.User != null) {
      if (this.TestHomes()) {
        return true;
      }
      else return false;
    }
    else return false;
  }
  LeaveReview(value): void {
    this.Review.response = value;
  }
  CheckResponse(): boolean {
    if (this.Review.response != "") {
      return true
    }
    else return false
  }
  CheckTier(value): boolean {
    if (this.Tier >= value) {
      return true;
    }
    else return false
  }
  TestHomes(): boolean {
    if (this.Home.userID == this.User.email) {
      return true;
    }
    else return false;
  }
  Agreed(): string {
    return ((this.Review.agreed / (this.Review.agreed + this.Review.disagreed)) * 100) + "%"
  }
  Disagreed(): string {
    return ((this.Review.disagreed / (this.Review.agreed + this.Review.disagreed)) * 100) + "%"
  }
  GetTooltip(): string {
    return "Agreed: " + this.Review.agreed + "\tDisagreed: " + this.Review.disagreed;
  }
  OpenPopup() {
    myExtObject.initPopup(this.ID); 
  }
  ClosePopup() {
    myExtObject.closePopup(this.ID); 
   }
  ngOnInit() {
    this.ID = this.Review.reviewID;
  }

}
