import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {AuthService} from '../auth.service';
import {UserService} from '../user.service';
import {PostService} from '../../blog/post.service';
import { ActivatedRoute  } from '@angular/router';
import {Post} from '../../blog/blog/post';
import {Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css'],
  providers: [PostService]
})
export class UserPostsComponent implements OnInit {

	 user: User = new User();
	 pageTitle: string = " ";
	 posts: Post[] = [];
  
  constructor(

  	private authService: AuthService,
  	private postService: PostService,
  	private userService: UserService,
  	private route: ActivatedRoute,
  	private title: Title


  	) { 

  
}

  ngOnInit() {

	var userId = this.route.snapshot.params['id'];

	this.user = this.userService.getUserById(userId).subscribe(res => {

		this.user = res as User;

		let userBlogTitle = this.user.firstName + "'s blog";
		this.pageTitle = userBlogTitle;

		this.title.setTitle(userBlogTitle);


	let query = {
		include: ["account"]
	}

	let filter = encodeURI(JSON.stringify(query))

	this.postService.getUserPosts(userId, filter).subscribe(response => {

		console.log(response);
		this.posts = response as Post[];
	
	}, err => {

		console.log(err);
	});

	
   }, err => {

   	console.log(err);

   });


  }

}






