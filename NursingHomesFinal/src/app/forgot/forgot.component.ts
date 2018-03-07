import { Component, OnInit } from '@angular/core';
import 'script.js';
import { AuthService } from '../auth.service';

declare var myExtObject: any;

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(private authService: AuthService) { }
  email:string;
  
  changePassword()
  {
    this.authService.resetPassword(this.email);
  }
  ngOnInit() {
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
  }

}
