import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';

declare var myExtObject: any;

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  items$: Observable<any[]>;
  id: string;
  blog: Observable<any>;
  paragraphs: Observable<any[]>;
  comments: Observable<any[]>;
  blogref: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private router: Router) { 
    const itemsList = db.list<any>('blogs');
    this.items$ = itemsList.valueChanges();
    this.items$.subscribe(console.log);
  }

  ngOnInit() {
    myExtObject.initFullpage("not home");//tells the full page plugin not to fire on this page

    this.route.queryParams
      .filter(params => params.id)
      .subscribe(params => {
        if (params['id']) {
          const blogref = this.db.object('blogs/' + params.id);
          this.blog = blogref.valueChanges();
          //this.getBlog(params.id);
          this.id = params.id;
          this.getParagraphs(params.id);
          //this.getComments(params.id);
        }
      });
  }

  getBlog(id){
    this.blog = this.db.object('blogs/' + id).valueChanges();
    this.blog.subscribe();
  }

  getParagraphs(id){
    this.paragraphs = this.db.list('blog-paragraphs/' + id).valueChanges();
  }

  getComments(id){
    this.comments = this.db.list('blog-comments/' + id).valueChanges();
  }

  goToPost(id: string){
    this.router.navigate(["/webSide/blogpost"], { queryParams: { id: id } });
  }

}


  /*
  IncrementAgreed(x: string){
    //this.db.object('blogs/' + this.id).update('likes', this.blog.);
    const b = this.db.object('blogs/' + this.id).snapshotChanges().subscribe(action => {
      this.blogref.update({likes: 1});
    });
  }
  */

/*
const itemsList = db.list<any>('blogs');
    this.items$ = itemsList.valueChanges();
    this.items$.subscribe(console.log);
    */