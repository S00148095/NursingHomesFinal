import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-tile',
  templateUrl: './blog-tile.component.html',
  inputs: ['blog'],
  styleUrls: ['./blog-tile.component.css']
})
export class BlogTileComponent implements OnInit {

  blog: any;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.blog);  }

  goToPost(){
    //console.log('clicked');
    this.router.navigate(["/webSide/blogpost"], { queryParams: { id: this.blog.id } });
  }

}
