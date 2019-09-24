import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'sn-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
    console.log(this.user);
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
