import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from "../../shared/models/post";
import { config } from "../../shared/config";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  url:string = `${config.baseUrl}/wall`;

  allposts(){
    return this.http.get(this.url);
  }

  newPost(post:Post){
    return this.http.post<Post>(`${this.url}/new`,post);
  }
  delete(postID){
    let httpParams = new HttpParams().set('id',postID)
    let options = { params: httpParams}
    // ajunge in req.query ===================================================
    return this.http.delete(`${this.url}/delete`, options);
  }
}
