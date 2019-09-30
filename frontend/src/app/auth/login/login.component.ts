import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'sn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginMessage: string = 'login status here';
  loginValidate: boolean = false;
    email:string = '';
    password: string = ''
 
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login(){
    const result = this.authService.checkLogin(this.email,this.password);
    this.loginValidate = result.status;
    this.loginMessage = result.message;

    if(this.loginValidate) {
      this.authService.login(this.email,this.password).subscribe((data)=>{
        console.log(data);
      },(err)=>{
        console.log(err);
      });
    }
  }
}
