import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from "../../services/post.service";

@Component({
  selector: 'sn-wall-feed',
  templateUrl: './wall-feed.component.html',
  styleUrls: ['./wall-feed.component.scss']
})
export class WallFeedComponent implements OnInit {
  currentUser;
  currentUserStatus: boolean = false;
  commentArray = [];
  comment_message: string;
  panelOpenState: boolean = false;
  showAdd;
  constructor(
    private postService: PostService
      ) { }

  @Input() post: any;

  @Output() edit = new EventEmitter;
  @Output() delete = new EventEmitter;
  @Output() refresh = new EventEmitter;

  ngOnInit() {
    this.feedCheck();
    this.currentUser = JSON.parse(localStorage.getItem('user'))
  }
  

  togglePanel() {
      this.panelOpenState = !this.panelOpenState
  }

  feedCheck(){
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    if(this.currentUser.email === this.post['user.email']){
      return this.currentUserStatus = true;
    }
  }

  editPost(){
    console.log(this.post)
    this.edit.emit(this.post);
  }

  deletePost(){
    this.postService.delete(this.post.id).subscribe((data)=>{
      let message = data['result']['message'];
      this.delete.emit(message);
    })
  }

  likeThis(){
    const request = { 
      userID : this.currentUser.id,
      postID : this.post.id
    }
    this.postService.like(request).subscribe((data)=>{
      this.refresh.emit()
    })
  }

  populateComments(elem){
    this.commentArray = []
    const request = { postID : this.post.id }
    this.postService.getComments(request).subscribe((data)=>{
     this.commentArray = data['comments']
    })
  }


  createComment(elem){
    if(!elem.value){
    } else {
      const request = { message: elem.value , postID: this.post.id, userID: this.currentUser.id};
      this.postService.createComment(request).subscribe((data)=>{
        this.populateComments(elem)
        this.comment_message = '';
        this.refresh.emit()
      })
    }
  }
}
