import { Component, OnInit } from '@angular/core';
import { PostService } from "../services/post.service";

@Component({
  selector: 'sn-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  newPostStatus:boolean = false;
  numberOfPosts: number;
  postsArray = [];
  user : any;
  constructor(
    private postService: PostService,
    
  ) { }

  ngOnInit() {
    // not sure if OK to get user at ngOnInit() or later?????????????
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  refreshFeed(){
    this.postService.allposts().subscribe((data)=>{
      this.numberOfPosts = data['numberOfPosts'];
      this.postsArray = data['allPosts'];
    });
  }
  newPost(event){
    const newPost = {
      author: this.user.name,
      title: event.title,
      description: event.description,
      likes: 0,
      comments: 0,
      email: this.user.email
    }
    console.log(newPost);
    this.postService.newPost(newPost).subscribe((data)=>{
      this.toggleNewPost();
    })
    this.refreshFeed();
  }
  toggleNewPost(){
    if(this.newPostStatus === false){
      this.newPostStatus = true
    } else {
      this.newPostStatus = false
    }
  }
  editPost(postID){
    console.log(postID);
    console.log('not made yet')
  }
  deletePost(postID){
    this.postService.delete(postID).subscribe((data)=>{
      let message = data['result']['message'];
      console.log(message)
    })
    this.refreshFeed();
  }

}
