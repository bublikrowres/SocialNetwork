import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'sn-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerMessage: string;
  registerValidate: boolean = false;
  user = {
    email: '',
    name: '',
    password: '',
    confirmedPassword: ''
  };
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register(){
    //created check function in AuthServices for register form
    const result = this.checkRegister(this.user)
    this.registerValidate = result.status;
    this.registerMessage = result.message;
    //register user
    if(this.registerValidate){
      this.authService.register(this.user).subscribe((data)=>{
        this.router.navigateByUrl('/wall');
        this.registerMessage = 'You are now registed'
        this.user = {
          email: '',
          name: '',
          password: '',
          confirmedPassword: ''
        };
      },(err)=>{
        this.registerMessage = 'Inserted data is not valid'
      });
    } 
  }
  checkRegister(userCheck){
    if(!userCheck.email || !userCheck.password || !userCheck.name || !userCheck.confirmedPassword) {
      return {status:false, message:'Please complete all required fields'}
    }
    if(userCheck.password.length<6){
      return {status :false, message:'Passwords must have at least 6 characters'}
    }
    if(userCheck.password!==userCheck.confirmedPassword){
      return {status :false, message:'Passwords don\'t match'}
    }
    const expression = /\S+@\S+/; //Regex to check if email has something@something
    if (!expression.test(String(userCheck.email).toLowerCase())) {
      return {status :false, message:'Email is not a valid format'};
    }
    return {status :true};
  }

}
