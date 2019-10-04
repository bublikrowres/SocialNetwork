import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'sn-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  post = {
    title: '',
    description: ''
  }
  constructor() { }

@Output() new = new EventEmitter();

  ngOnInit() {
  }
  newPost(){
    this.new.emit(this.post);
  }

}
