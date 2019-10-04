import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sn-wall-feed',
  templateUrl: './wall-feed.component.html',
  styleUrls: ['./wall-feed.component.scss']
})
export class WallFeedComponent implements OnInit {
  constructor() { }
  @Input() author: string;
  @Input() createdAt: string;
  @Input() title: string;
  @Input() description: string;
  @Input() likes: number;
  @Input() comments: number;
  @Input() id: number;
  @Output() edit = new EventEmitter;
  @Output() delete = new EventEmitter;

  ngOnInit() {
  }

  editPost(elem){
    console.log(elem.toElement.id);
    const postID = elem.toElement.id;
    this.edit.emit(postID);
  }
  deletePost(elem){
    const postID = elem.toElement.id;
    this.delete.emit(postID);
  }
}
