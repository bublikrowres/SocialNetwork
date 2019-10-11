import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'sn-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('user');
  }
  mouseOver(event){
    console.log(event)
    console.log(event.target.classList)
  }
  mouseOut(event){
    console.log('mouse Out')
  }
}
