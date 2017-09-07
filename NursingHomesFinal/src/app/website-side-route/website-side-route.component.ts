import { Component, OnInit } from '@angular/core';
import { StorageService } from "../storage.service";

@Component({
  selector: 'app-website-side-route',
  templateUrl: './website-side-route.component.html',
  styleUrls: ['./website-side-route.component.css']
})
export class WebsiteSideRouteComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  
  UpdateCurrentHome(): void {
    this.storageService.setCurrentHome(null);
  }

  ngOnInit() {
  }

}
