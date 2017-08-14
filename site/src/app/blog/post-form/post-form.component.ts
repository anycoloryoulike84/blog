import { Component, OnInit } from '@angular/core';
import {Post} from '../blog/post';
import {PostService} from '../post.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  providers: [PostService]
})

export class PostFormComponent implements OnInit {

	post: Post = new Post();
	errorMessage = "";



  constructor(

  	  	private postService: PostService,
  	  	private router: Router

  	) { 
  }

  ngOnInit() {


  }


  onSubmit() {
  	console.log(this.post);
  	//  Let do post this data to rest API service

  	this.postService.createPost(this.post).subscribe(res => {

  		// return succesful post
  		console.log(res.id);

  		// The post id we use to redirect the view to the detail of the post
  		this.router.navigate(['/blog', res.id]);
  		// direct to view post

  	}, err => {
  		console.log(err);
  		this.errorMessage = "An error occured in saving the post";
  	})

  }

}
