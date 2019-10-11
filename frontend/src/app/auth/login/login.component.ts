import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";


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
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(){
    const result = this.checkLogin(this.email,this.password);
    this.loginValidate = result.status;
    this.loginMessage = result.message;

    if(this.loginValidate) {
      this.authService.login(this.email,this.password).subscribe((data)=>{
        this.router.navigateByUrl('/nav');
        this.loginMessage = "You are now logged in"
      },(err)=>{
        this.loginMessage = "Incorrect Email or Passward"
      });
    }
  }
  checkLogin(email,password){
    if(!email || !password) {
      return {status:false, message:'Please complete all required fields'}
    }
    const expression = /\S+@\S+/; //Regex to check if email has something@something
    if (!expression.test(String(email).toLowerCase())) {
      return {status :false, message:'Email is not a valid format'};
    }
    if(password.length<6){
      return {status :false, message:'Passwords must have at least 6 characters'}
    }
    return {status :true};
  }

}
