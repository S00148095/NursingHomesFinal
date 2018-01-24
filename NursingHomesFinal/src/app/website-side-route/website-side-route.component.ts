import { Component, OnInit } from '@angular/core';
import { StorageService } from "../storage.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-website-side-route',
  templateUrl: './website-side-route.component.html',
  styleUrls: ['./website-side-route.component.css']
})
export class WebsiteSideRouteComponent implements OnInit {

  constructor(private storageService: StorageService, private router: Router) { }

  
  UpdateCurrentHome(): void {
    this.router.navigate(["/webSide/contact"], { queryParams: { id: "careze" } });
  }

  ngOnInit() {
  }

}
