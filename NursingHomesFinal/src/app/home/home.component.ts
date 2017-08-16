import { Component, OnInit } from '@angular/core';
import { StorageService } from "../storage.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchCriteria: string[];

  constructor(private storageService: StorageService) { }

  GetCriteria(): void {
    this.searchCriteria = this.storageService.getCriteria();
  }
  SetCriteria(): void {
    this.storageService.setCriteria(this.searchCriteria);
    this.searchCriteria=[];
  }
  UpdateCriteria(option,county)
  {
    this.searchCriteria=[option,county];
    this.SetCriteria();
  }
  ngOnInit() {
  }

}
