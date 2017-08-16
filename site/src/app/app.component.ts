import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {PostService} from './blog/post.service';
import {Post} from './blog/blog/post';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PostService]
})

export class AppComponent implements OnInit {

  title: string = 'CNA Database';
  description: string = 'CNA Replica Set Test Site for example';
	posts: Post[] = [];
	post: Post = new Post();

  pager = {
    limit: 2,
    current: 0, 
    reachedEnd: false,
  };

  query = {
      limit: this.pager.limit,
      skip: this.pager.limit * this.pager.current
  };

  constructor(
    
    private route: ActivatedRoute,
  	protected postService: PostService

    ) { }

  ngOnInit() {



  }





}
