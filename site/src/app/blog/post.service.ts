import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import {Post} from './blog/post';
import {isNull} from 'util';
import {AuthService} from '../user/auth.service';
import {User} from '../user/user';
import {Category} from './category.model';
import {Comment} from "./comment/comment"



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


    updateHeaders(){

      this.headers.set('Authorization', this.authService.getToken());

    }


  	getPosts(filter: string): Observable<Post[]> {
  		
  		 let url = "http://0.0.0.0:3000/api/posts";

      if (!isNull(filter) && filter !== "") {
         url = url + '?filter=' + filter;
      }

  		return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
  			
  			return Observable.throw(err);
  		
  		});

  	}



    search(text: string): Observable<any>{
      
      let query = {

        where: {
          or: [{title: {like: text, options: "i"}}],
        }
      };

      let filter = encodeURI(JSON.stringify(query));

      
      let url = "http://0.0.0.0:3000/api/posts?filter=" + filter ;

      return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
        
        return Observable.throw(err)
      
      });

    }


    addComment(comment: Comment): Observable<any> {

      let url = "http://0.0.0.0:3000/api/posts/" + comment.postId + "/comments";

      return this.http.post(url, comment, {headers: this.headers}).map(res => res.json()).catch(err => Observable.throw(err));

    }


  	getPost(id: string, filter?: string): Observable<Post>{

  		let url = "http://0.0.0.0:3000/api/posts/" + id;

      if(filter){
      url = url + "?filter=" + filter;
    }
    
  		return this.http.get(url, {headers: this.headers}).map(res => res.json() as Post).catch(err => {
  			
  			return Observable.throw(err)
  		
  		});

  	}










    getCategories(): Observable<Category[]> {

     let url = "http://0.0.0.0:3000/api/categories";

     return this.http.get(url, {headers: this.headers}).map(res => res.json() as Category[]).catch(err => Observable.throw(err));

    }



    getCategoryById(id: string, filter?: string): Observable<Category> {

     let url = "http://0.0.0.0:3000/api/categories/" + id + "?filter=" + filter;

     return this.http.get(url, {headers: this.headers}).map(res => res.json() as Category[]).catch(err => Observable.throw(err));


    }


    getPostByCategoryId(id: string): Observable<Post[]> {

     let url = "http://0.0.0.0:3000/api/categories/" + id + "/posts";

     return this.http.get(url, {headers: this.headers}).map(res => res.json() as Post[]).catch(err => Observable.throw(err));


    }




    getUserPosts(userId: string, filter: string) {


       let url = "http://0.0.0.0:3000/api/accounts/" + userId + "/posts";

      if (!isNull(filter) && filter !== "") {

         url = url + "?filter=" + filter;

      }


      return this.http.get(url, {headers: this.headers}).map( res => res.json() ).catch(err => {
        
        return Observable.throw(err)
      
      });



    }



    createPost(post: Post): Observable<any> {

      this.updateHeaders();

      let user = this.authService.getCurrentUser() as User;
      let userId = user.id;
      let url = "http://0.0.0.0:3000/api/accounts/" + userId + "/posts";

      return this.http.post(url, post, { headers: this.headers}).map( res => res.json() ).catch(err => {
        
        return Observable.throw(err);

      })

    }


     updatePost(post: Post): Observable<any> {

       this.updateHeaders();

      let url = "http://0.0.0.0:3000/api/posts/" + post.id;
      return this.http.put(url, post, { headers: this.headers}).map( res => res.json() ).catch(err => {
        return Observable.throw(err);

      })

    }



}




 