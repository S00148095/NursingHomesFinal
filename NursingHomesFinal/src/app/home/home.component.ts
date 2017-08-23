import { Component, OnInit } from '@angular/core';
import { StorageService } from "../storage.service";
import { Home } from "../Home";
import 'script.js';

declare var myExtObject: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Homes: Home[];
  searchCriteria: string[];
  lats: number[] = [];
  longs: number[] = [];

  constructor(private storageService: StorageService) {
    this.GetHomes();
  }

  GetHomes(): void {
    this.storageService.getHomes().then(homes => this.Homes = homes);
  }
  GetCriteria(): void {
    this.searchCriteria = this.storageService.getCriteria();
  }
  SetCriteria(): void {
    this.storageService.setCriteria(this.searchCriteria);
    this.searchCriteria = [];
  }
  UpdateCriteria(option, county) {
    this.searchCriteria = [option, county];
    this.SetCriteria();
  }
  Calculate(address) {
    address = address || 'Dublin, Ireland';
    for (var i = 0; i < this.Homes.length; i++) {
      this.lats.push(this.Homes[i].lat);
      this.longs.push(this.Homes[i].long);
    }
    myExtObject.CalculateDistance(address, this.lats, this.longs);
    this.storageService.updateAddress(address);
    this.UpdateCriteria("distance", "");
  }
  ngOnInit() {
  }

}
