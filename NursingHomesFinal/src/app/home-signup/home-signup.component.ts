import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Home } from '../Home';
import { StorageService } from '../storage.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-home-signup',
  templateUrl: './home-signup.component.html',
  styleUrls: ['./home-signup.component.css']
})
export class HomeSignupComponent implements OnInit {
  addedHomes: Home[] = [];
  sortedHomes: Home[] = [];
  homes: Home[] = [];
  test: string;
  constructor(private storageService: StorageService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr); }

  GetHomes(): void {
    this.storageService.getHomes().subscribe(homes => {
      for (var k in homes) {
        this.homes.push(homes[k]);
      }
    });
  }
  getAutocomplete() {
    this.sortedHomes=[];
    this.homes.forEach(element => {
      if (element.name.toUpperCase().indexOf(this.test.toUpperCase()) != -1) {
        this.sortedHomes.push(element);
      }
    });
  }
  checkLength() {
    if (this.test == "") {
      this.sortedHomes = [];
    }
    if (this.sortedHomes.length > 0) {
      return true;
    }
    else return false
  }
  AddHome(home) {
    if (this.addedHomes.indexOf(home)==-1) {
      this.addedHomes.push(home);
    }
    this.test = "";
    this.sortedHomes = [];
  }
  SubmitHomes()
  { 
    this.storageService.submitHomes(this.addedHomes); 
  }
  ngOnInit() {
    this.GetHomes();
  }

}
