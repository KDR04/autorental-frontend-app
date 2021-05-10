import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from '../models/user';
import { LoginService} from '../service/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  allUser : user[];
  errorMessage : string = "";
  authUser : boolean;

  ngOnInit(): void {
   
    this.loginService.getUsers().subscribe(
      (data)=> {
          
          this.allUser = data;
      }  ,(error)=>{
        console.log(error);
          this.errorMessage = "Internal Server Error. Please try again later.";
          
      }      
      )
      ;

  }

  constructor(private loginService : LoginService, private router: Router) { }
  
  // loginForm = new FormGroup({
  //   userName: new FormControl('', Validators.required),
  //   userPassword: new FormControl('', Validators.required)
  // })

  

  userName = new FormControl('', [Validators.required]);
  userPassword = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.userName.hasError('required')) {
      return 'You must enter a value';
    }

    // return this.userName.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorPassword() {
    if (this.userPassword.hasError('required')) {
      return 'You must enter a value';
    }
  }
  
  

  

  validateLogin() {

    this.allUser.forEach(
      user =>
      {
        console.log(user);
        console.log('checking form value ' + this.userName.value + this.userPassword.value);
        if (user.name.match(this.userName.value) && user.password.match(this.userPassword.value)) {
          // user found, validate
          console.log('entered here bitch')
            this.authUser = true;
        }
      }
    )
    
    if (this.authUser == true) {
      // move to homepage
      console.log('User' + this.userName +  'is now logged in')
      this.router.navigate(['/app-home-page']);
    }
    else {
      // display error message
      this.errorMessage = 'Username or password is wrong, please try again';
    }
    
    


  }

}

