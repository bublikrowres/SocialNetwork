import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

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
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  register(){
    //created check function in AuthServices for register form
    const result = this.authService.checkRegister(this.user)
    this.registerValidate = result.status;
    this.registerMessage = result.message;
    //register user
    if(this.registerValidate){
      this.authService.register(this.user).subscribe((data)=>{
        console.log(data);
        this.user = {
          email: '',
          name: '',
          password: '',
          confirmedPassword: ''
        };
      },(err)=>{
        console.log(err);
      });
    } 
  }
}
