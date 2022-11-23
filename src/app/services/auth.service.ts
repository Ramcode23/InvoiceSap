import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, UserLogin } from '../Models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.AppUrl+'/Account';
  constructor(private http: HttpClient) { }


  loging(userLogin: UserLogin) {

    return this.http.post(`${this.url}/login`, userLogin);
  }

  register(registerUser: User) {
  debugger
    return this.http.post(`${this.url}/register`, registerUser);
  }



}
