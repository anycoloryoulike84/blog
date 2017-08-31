import { Component, OnInit } from '@angular/core';
import {Post} from '../blog/post';
import {PostService} from '../post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Observable} from "rxjs";
import {Category} from '../category.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  providers: [PostService]
})

export class PostFormComponent implements OnInit {

	post: Post = new Post();
	errorMessage = "";
  successMessage = "";
	loading = false;
  defaultBodyValue: string = "";
  categories: Category[] = [];

  constructor(

  	  	private postService: PostService,
  	  	private router: Router,
  	  	private route: ActivatedRoute ) { 

  }

  ngOnInit() {

    if(this.route.snapshot.params['id']){


    this.route.params.switchMap((params: Params) => {
      
      let id = params['id'];

      if (typeof params['id'] !== "undefined" && params['id'] !== null) {
           
         this.loading = true;
         return this.postService.getPost(id); 
 
      }

    }).subscribe(res => {

       this.loading = false;
       this.post = res as Post;
       this.defaultBodyValue = this.post.body;

    }, err => {
    console.log(err);
      
      });
    }

    this.postService.getCategories().subscribe(res => {

      this.categories = res;


    }, err => {
      console.log(err)
    });






  }


  onSubmit() {

  	//  if post.id is not null we must update the post, else create new post

  	if (this.post.id) {

  		this.postService.updatePost(this.post).subscribe(res => {
		  this.router.navigate(['/blog', this.post.id]);
      this.successMessage = "Blog Post Submitted"

  		}, err => {

  				console.log(err)
  				this.errorMessage = "Error in saving the post"
          this.successMessage = "Blog Post Submitted"
  		})

  	} else {

  	}

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
      this.successMessage = "Blog Post Submitted";
  	})

  }


  onBodyTextEditorKeyUp(textValue) {

    console.log(textValue);
      this.post.body = textValue;

  }






}
