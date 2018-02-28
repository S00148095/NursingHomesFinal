import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

declare var myExtObject: any;

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
/*
  blogs: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

  constructor(private db: AngularFireDatabase) { 
    this.blogs = this.db.list('blogs').snapshotChanges();
  }
*/
  items$: Observable<any[]>;

  constructor(db: AngularFireDatabase, private router: Router) {
    const itemsList = db.list<any>('blogs');
    this.items$ = itemsList.valueChanges();
    this.items$.subscribe(console.log);
  }

  ngOnInit() { 
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page
  }

  goToPost(id: string){
    this.router.navigate(["/webSide/blogpost"], { queryParams: { id: id } });
  }

}
