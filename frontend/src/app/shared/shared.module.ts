import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from "../app-routing.module";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [MatCardModule,MatInputModule,MatButtonModule,AppRoutingModule,HttpClientModule,FormsModule]
})
export class SharedModule { }

