import { Component, OnInit } from '@angular/core';
import 'script.js';

declare var myExtObject: any;

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
  }

}
