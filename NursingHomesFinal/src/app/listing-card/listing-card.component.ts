import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  inputs: ["home"],
  styleUrls: ['./listing-card.component.css']
})
export class ListingCardComponent implements OnInit {

  image: string;
  home: any;

  constructor(private router: Router, private firebaseApp: FirebaseApp) { }

  ngOnInit() {
    this.getImage();
  }

  getImage(){//get image from firebase storage, assign it to image variable
    const storageRef = this.firebaseApp.storage().ref().child(this.home.images.path);
    storageRef.getDownloadURL().then(url => this.image = url);
  }

  CheckRating(rating: number): string {//displays stars
    if (this.home.rating >= rating) return "yellow star icon"
    else if (this.home.rating <= rating - 1 || this.home.rating == null || this.home.rating == undefined) return "empty yellow star icon"
    else return "yellow star half empty icon"
  }

  goToListing(){//navs to the home's full listing
    this.router.navigate(["/webSide/details"], { queryParams: { id: this.home.ID } });
  }

}
 