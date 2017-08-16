import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
import {Post} from './post';
import {isNullOrUndefined} from "util";


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [PostService]
})
export class BlogComponent implements OnInit {

	title: string = "CNA Sample BLOG!";
	posts: Post[] = [];

  pager = {
    limit: 5,
    current: 0, 
    reachedEnd: false,
    isLoading: false
  };

  query = {
      limit: this.pager.limit,
      skip: this.pager.limit * this.pager.current
  };


  constructor(
    
    private postService: PostService

    ) { }


  ngOnInit() {

    this.getAll();

  }


  getAll(){

    this.query.limit = this.pager.limit;
    this.query.skip = this.pager.limit * this.pager.current;


    let filter = encodeURI(JSON.stringify(this.query));

      this.postService.getPosts(filter).subscribe(res => {

        // this.posts = res as Post[];
        this.pager.isLoading = false;

        if (!isNullOrUndefined(res) && res.length ) {

          this.posts = this.posts.concat(res);
        } else {
          this.pager.reachedEnd = true;

        }
        
          }, err => {

            console.log(err)
      })


  }

  loadMore() {
    
    // when clicked load more, we need to increase current + 1an dfetch addtnl posts
    //  if currentpage = 0, we skip : = limit*current
      this.pager.isLoading = true;
      this.pager.current = this.pager.current + 1;
      this.getAll();

  }



}















