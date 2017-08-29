import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {PostService} from './blog/post.service';
import {Post} from './blog/blog/post';
import {isNullOrUndefined} from "util";
import {User} from './user/user';
import {AuthService} from './user/auth.service';
import {UserService} from './user/user.service';
import {Observable, Subject} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PostService]   
})

export class AppComponent implements OnInit {

  title: string = 'CNA Database';
  description: string = 'CNA Replica Set Test Site for example';
	post: Post = new Post();
  user: User = new User();
  loggedIn: boolean = false;

  pager = {
    limit: 2,
    current: 0, 
    reachedEnd: false,
  };

  query = {
      limit: this.pager.limit,
      skip: this.pager.limit * this.pager.current
  };

  private searchTerm = new Subject<string>();
  
  posts: Post[] = [];
  
  autocompleteBox = { 

    hide: true;

  }



  constructor(
    
    private route: ActivatedRoute,
  	protected postService: PostService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router

    ) {

      this.user = this.authService.getCurrentUser();

      if (this.user && !isNullOrUndefined(this.user)) {

        this.loggedIn = true;

      }

      this.searchTerm.debounceTime(100).distinctUntilChanged().subscribe(searchTerm => {

        this.postService.search(searchTerm).subscribe(response => {

          this.posts = response as Post[];
          this.autocompleteBox.hide = false;

        }, err => {
          console.log(err);
        });


      });
     


     }

      ngOnInit() {

        this.authService.onAuthChange$.subscribe(user => {


          if (user) {
            // user has logged in
            this.loggedIn = true;
                      console.log("Logged In as: ", user.username );
          } else {
            // user has logged out
            this.loggedIn = false;

          }

        });




      }


      logout() {
          // request logout to server api
          
          this.loggedIn = false;
          this.userService.logout();
          this.authService.logout();

          this.router.navigate(['./home'])


      }


      onKeyUp(searchText: string) {

        if (searchText !== "") {
          this.searchTerm.next(searchText);
            
        }


      }

      showDetail(post: Post) {
        this.autocompleteBox.hide = true;
        this.router.navigate(['/blog', post.id]);

      }


}
