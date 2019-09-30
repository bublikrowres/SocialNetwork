import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/user';
import { config } from "../../shared/config";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string = `${config.baseUrl}/users`;

  constructor(
    private http: HttpClient
  ) { }

  register(user:User){
    return this.http.post<User>(this.url,user);
  }

  checkRegister(userCheck){
    if(!userCheck.email || !userCheck.password || !userCheck.name || !userCheck.confirmedPassword) {
      return {status:false, message:'Please complete all required fields'}
    }
    if(userCheck.password.length<6){
      return {status :false, message:'Passwords must have at least 6 characters'}
    }
    if(userCheck.password!==userCheck.confirmedPassword){
      return {status :false, message:'Passwords don\'t match'}
    }
    const expression = /\S+@\S+/; //Regex to check if email has something@something
    if (!expression.test(String(userCheck.email).toLowerCase())) {
      return {status :false, message:'Email is not a valid format'};
    }
    return {status :true, message:'You are now registered'};
  }

  login(email:string, password: string){
    return this.http.post<User>(`${this.url}/login`,{email,password});
  }

  checkLogin(email,password){
    if(!email || !password) {
      return {status:false, message:'Please complete all required fields'}
    }
    const expression = /\S+@\S+/; //Regex to check if email has something@something
    if (!expression.test(String(email).toLowerCase())) {
      return {status :false, message:'Email is not a valid format'};
    }
    if(password.length<6){
      return {status :false, message:'Passwords must have at least 6 characters'}
    }
    return {status :true, message:'You are now logged in'};
  }
}
