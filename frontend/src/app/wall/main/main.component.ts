import { Component, OnInit } from '@angular/core';
import { PostService } from "../services/post.service";
import {MatDialog} from '@angular/material/dialog';
import {EditComponent} from './edit/edit.component';

@Component({
  selector: 'sn-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  alertStatus: boolean = false;
  alertContent: string = 'test';
  newPostStatus:boolean = false;
  numberOfPosts: number;
  postsArray = [];

  user : any;
  alertTimeout;
  constructor(
    private postService: PostService,
    public dialog: MatDialog
  ) {
    
   }

  ngOnInit() {
    // not sure if OK to get user at ngOnInit() or later?????????????
    this.user = JSON.parse(localStorage.getItem('user'));
    this.refreshFeed()
  }

  refreshFeed(){
    this.postService.allposts().subscribe((data)=>{
      this.numberOfPosts = data['numberOfPosts'];
      this.postsArray = data['allPosts'];
      // console.log('refresh feed called');
    });
  }
  alert(message){
    this.alertStatus = true;
    this.alertContent = message;
    if(!this.alertTimeout){
      this.alertTimeout = setTimeout(() => {
        this.alertStatus = false;
        this.alertContent = '';
      }, 2000);
    }else {
      clearInterval(this.alertTimeout)
      this.alertTimeout = setTimeout(() => {
        this.alertStatus = false;
        this.alertContent = '';
      }, 2000);
    }
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
    this.postService.newPost(newPost).subscribe((data)=>{
      let message = data['message'];
      this.toggleNewPost();
      this.refreshFeed();
      this.alert(message);
    })
    
  }
  toggleNewPost(){
    if(this.newPostStatus === false){
      this.newPostStatus = true
    } else {
      this.newPostStatus = false
    }
  }

  editPost(post){
    this.openDialog(post);
  }

  deletePost(message){
    this.refreshFeed();
    this.alert(message);
  }
  
  openDialog(post): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '350px',
      data: {id: post.id , title: post.title, description: post.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshFeed();
    });
  }

  likeOrComment(event){
    this.refreshFeed();
    this.alert(event.message)
  }
}
