import { Component, OnInit } from '@angular/core';
import {isNullOrUndefined} from "util";
import { User } from '../user';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit {


  user: User = new User();
  loggedIn: boolean = false;

  constructor(
  	private authService: AuthService,
    private router: Router

  	) { 

        this.user = this.authService.getCurrentUser();

      if (this.user && !isNullOrUndefined(this.user)) {

        this.loggedIn = true;

      }

}


  ngOnInit() {


  	this.user = this.authService.getCurrentUser();

    if (this.user === null) {
      // redirect to login page

      this.router.navigate(['/user/login']);
      console.log("Is logged in: " + this.loggedIn);


    } else {

      this.router.navigate(['/user/my-account']);
       console.log(this.user.username + " is logged in: " + this.loggedIn);
       console.log(this.user);

    }



  }

}










