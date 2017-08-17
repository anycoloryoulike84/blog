import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import {Post} from './blog/post';
import {isNull} from 'util';
import {AuthService} from '../user/auth.service';



@Injectable()

export class PostService {

 

  constructor(

    private http: Http,
    private authService: AuthService


    ) { }

	headers = new Headers({
 	 	
 	 	'Content-Type': 'application/json',
    'Authorization': this.authService.getToken()
		
	 });


  	getPosts(filter: string): Observable<Post[]> {
  		
  		 let url = "http://0.0.0.0:3000/api/posts";

      if (!isNull(filter) && filter !== "") {

         url = url + "?filter=" + filter;

      }


  		return this.http.get(url, {headers: this.headers}).map( res => res.json() ).catch(err => {
  			
  			return Observable.throw(err)
  		
  		});
  	}


  	getPost(id: string): Observable<Post>{

  		let url = "http://0.0.0.0:3000/api/posts/" + id;
  		return this.http.get(url, {headers: this.headers}).map(res => res.json() as Post).catch(err => {
  			
  			return Observable.throw(err)
  		
  		});

  	}



    createPost(post: Post): Observable<any> {

      let url = "http://0.0.0.0:3000/api/posts";
      return this.http.post(url, post, { headers: this.headers}).map( res => res.json() ).catch(err => {
        
        return Observable.throw(err);

      })

    }


        updatePost(post: Post): Observable<any> {

      let url = "http://0.0.0.0:3000/api/posts/" + post.id;
      return this.http.put(url, post, { headers: this.headers}).map( res => res.json() ).catch(err => {
        return Observable.throw(err);

      })

    }



}


 