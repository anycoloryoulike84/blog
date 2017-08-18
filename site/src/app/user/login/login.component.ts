import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {UserService} from '../user.service';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})


export class LoginComponent implements OnInit {

	user: User = new User();
  loggedIn: boolean = false;


  constructor(

  	private userService: UserService, 
  	private authService: AuthService,
  	private router: Router  

  	) { }





  ngOnInit() {


  }




  onLogin() {

	// we have user object data. now we must post it to the API and get the acess token
  	
  	console.log("login tapped with data", this.user);


  	let user = this.user;
  	
  	this.userService.login(user.username, user.password).subscribe(response => {

  		let user = response.user;
  		this.authService.setUser(user);

  		let token = response.id;

  		this.authService.setToken(token);


      

  		// now we redirect to their profile if logged in

  		this.router.navigate(['/user/my-account']);
      this.loggedIn = true;

  	}, err => {

  		console.log(err);

  	})

  }


}






