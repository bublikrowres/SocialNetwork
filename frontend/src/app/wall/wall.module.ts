import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { WallFeedComponent } from './main/wall-feed/wall-feed.component';
import { WallControlComponent } from './main/wall-control/wall-control.component';
import { NewPostComponent } from './main/new-post/new-post.component';



@NgModule({
  declarations: [MainComponent, WallFeedComponent, WallControlComponent, NewPostComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class WallModule { }
