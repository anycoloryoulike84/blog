import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import {User} from './user';
import {isNull} from 'util';




@Injectable()

export class UserService {


  headers = new Headers({
  	'Content-Type': 'application/json',
  });


  constructor(private http: Http) { 

  }



login(username:string,password:string): Observable<any>{

	let url = "http://0.0.0.0:3000/api/Users/login?include=user";

		return this.http.post(url, {
			username:username, 
			password:password
		}, {headers: this.headers}).map(res => res.json()).catch(err => {

			return Observable.throw(err);
		})


	}

 

}




