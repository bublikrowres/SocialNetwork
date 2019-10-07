import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from "../../services/post.service";

@Component({
  selector: 'sn-wall-feed',
  templateUrl: './wall-feed.component.html',
  styleUrls: ['./wall-feed.component.scss']
})
export class WallFeedComponent implements OnInit {
  currentUserStatus: boolean = false;
  currentUser = JSON.parse(localStorage.getItem('user'));
  commentArray = [];
  addButtonToggle: boolean = false;
  comment_message: string;
  alertStatus: boolean = false;
  alertMessage:string;
  constructor(
    private postService: PostService,
      ) { }

  @Input() post: any;

  @Output() edit = new EventEmitter;
  @Output() delete = new EventEmitter;
  @Output() refresh = new EventEmitter;

  ngOnInit() {
    this.feedCheck();
  }

  feedCheck(){
    if(this.currentUser.email === this.post['user.email']){
      return this.currentUserStatus = true;
    }
  }

  editPost(){
    this.edit.emit(this.post);
    console.log(this.post)
  }

  deletePost(){
    this.postService.delete(this.post.id).subscribe((data)=>{
      let message = data['result']['message'];
      this.delete.emit(message);
    })
  }

  likeThis(){
    const request = { 
      userID : this.post['user.id'],
      postID : this.post.id
    }
    this.postService.like(request).subscribe((data)=>{
      this.refresh.emit(data)
    })
  }

  populateComments(){
    this.commentArray = []
    const request = { postID : this.post.id }
    this.postService.getComments(request).subscribe((data)=>{
     this.commentArray = data['comments']
    })
  }

  commentToggle(){
    this.addButtonToggle ? this.addButtonToggle = false : this.addButtonToggle = true;
  }

  createComment(elem){
    if(!elem.value){
      this.alertStatus = true;
      this.alertMessage = 'Content required'
    } else {
      this.alertStatus = false;
      this.alertMessage = '';
      const request = { message: elem.value , postID: this.post.id, userID: this.currentUser.id};
      this.postService.createComment(request).subscribe((data)=>{
        this.populateComments()
      })
      this.comment_message = ''
      this.commentToggle();
    }
  }
}
