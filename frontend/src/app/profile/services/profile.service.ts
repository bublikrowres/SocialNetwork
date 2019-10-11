import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { config } from "../../shared/config";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url:string = `${config.baseUrl}/profile`;
  constructor(
    private http: HttpClient
  ) { }

  getUser(userID){
    return this.http.get(`${this.url}/${userID}`)
  }
  updateUser(editedUser){
    return this.http.put(`${this.url}/${editedUser.id}`,editedUser)
  }
  uploadPhoto(formData){
    return this.http.post(`${this.url}/photo`,formData);
  }
}
