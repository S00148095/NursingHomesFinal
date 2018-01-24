import { Component, OnInit } from '@angular/core';
import { StorageService } from "../storage.service";
import { Home } from "../Home";
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  inputs: ["Home"],
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  Home: Home;

  constructor(private storageService: StorageService,private router:Router)
   {
    }
 
  UpdateCurrentHome(): void {//updates the current home
    this.router.navigate(["/webSide/edit-details"], { queryParams: { id: this.Home.ID } });//navigates to the details page and sets the queryParams
 
  }
  ngOnInit() {
  }
}
