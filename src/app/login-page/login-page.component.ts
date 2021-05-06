import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  
  // loginForm = new FormGroup({
  //   userName: new FormControl('', Validators.required),
  //   userPassword: new FormControl('', Validators.required)
  // })

  

  userName = new FormControl('', [Validators.required, Validators.email]);
  userPassword = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.userName.hasError('required')) {
      return 'You must enter a value';
    }

    return this.userName.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorPassword() {
    if (this.userPassword.hasError('required')) {
      return 'You must enter a value';
    }
  }
  
  

  constructor() { }
  

  ngOnInit(): void {
   
  }

}
