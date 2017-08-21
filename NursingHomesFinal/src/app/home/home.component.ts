import { Component, OnInit } from '@angular/core';
import { StorageService } from "../storage.service";
import 'script.js';
import { Home } from "../Home";

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
  GetData: any[] = [];

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
  UpdateHomes() {
    this.storageService.updateHomes(this.Homes);
  }
  Calculate(address) {
    for (var i = 0; i < this.Homes.length; i++) {
      this.lats.push(this.Homes[i].lat);
      this.longs.push(this.Homes[i].long);
    }
    myExtObject.CalculateDistance(address, this.lats, this.longs);
    this.RetrieveData(address);
  }
  RetrieveData(address) {    
    address = address || 'Dublin, Ireland';
    for (var i = 0; i < this.Homes.length; i++) {
      this.GetData[i] = [];
      this.GetData[i].push(this.Homes[i].lat);
      this.GetData[i].push(this.Homes[i].long);
      this.GetData[i].push(10);
    }
    this.GetData = myExtObject.RetrieveData(address, this.GetData);
    for (var i = 0; i < this.Homes.length; i++) {
      for (var j = 0; j < this.GetData.length; j++) {
        if (this.GetData[j][0] == this.Homes[i].lat && this.GetData[j][1] == this.Homes[i].long) {
          this.Homes[i].distance = this.GetData[j][2];
        }
      }
    }
    myExtObject.ClearData();
    this.UpdateHomes();
    this.UpdateCriteria("distance", "");
  }
  ngOnInit() {
  }

}
