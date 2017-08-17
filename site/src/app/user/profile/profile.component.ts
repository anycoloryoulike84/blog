import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {AuthService} from '../auth.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit {


  user: User = new User();

  constructor(
  	private authService: AuthService

  	) { }


  ngOnInit() {


  	this.user = this.authService.getCurrentUser();



  }

}










