import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  inputs: ["Display","Link"],
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  Display: string;
  Link: string;
  constructor() { }

  ngOnInit() {
  }
 getLink(): string {
    return this.Link;
  }
}
