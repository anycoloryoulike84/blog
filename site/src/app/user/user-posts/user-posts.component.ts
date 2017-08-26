import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {AuthService} from '../auth.service';
import {PostService} from '../../blog/post.service';
import { ActivatedRoute  } from '@angular/router';
import {Post} from '../../blog/blog/post';

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
  	private route: ActivatedRoute


  	) { 

  this.user = this.authService.getCurrentUser();
  this.pageTitle = this.user.firstName + "'s blog"
}

  ngOnInit() {

	var userId = this.route.snapshot.params['id'];

	let query = {
		include: ["account"]
	}
	let filter = encodeURI(JSON.stringify(query))

	this.postService.getUserPosts(userId, filter).subscribe(response => {

		console.log(response);
		this.posts = response as Post[];
	}, err => {
		console.log(err);
	})

  }

}
