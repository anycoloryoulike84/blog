import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {PostService} from './blog/post.service';
import {Post} from './blog/blog/post';

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

  constructor(
    
      	private route: ActivatedRoute,
  	protected postService: PostService

    ) { }

ngOnInit() {


  	this.postService.getPosts().subscribe(res => {

  		this.posts = res as Post[];
		console.log(res);

  	}, err => {
  		console.log(err)
  	})
  	
  	this.route.params.switchMap((params:Params) => {

  		let id = params['id'];
  		return this.postService.getPost(id);
  	}).subscribe(response => {	
  		this.post = response;
  	}, err => {
  		console.log(err);
  	});  
  }

}
