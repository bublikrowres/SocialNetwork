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
  login(email:string, password: string){
    return this.http.post<User>(`${this.url}/login`,{email,password});
  }
}
