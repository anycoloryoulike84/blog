import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {PostService} from '../post.service';
import {Post} from '../blog/post';
import {Category} from '../category.model';




@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {

	posts: Post[] = [];

	category: Category = new Category();

  constructor (

  	private route: ActivatedRoute,
  	private postService: PostService

	) { }

  ngOnInit() {

  	let categoryId = this.route.snapshot.params["id"];

  	this.postService.getCategoryById(categoryId).subscribe(res => {

  		this.category = res;

  	});


  	this.postService.getPostByCategoryId(categoryId).subscribe(res => {

  		this.posts = res;

  	}, err => {

  		console.log(err);

  	});

  }


}
