import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from '../models/user';
import { LoginService} from '../service/login.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  allUser : user[];
  errorMessage : string = "";
  authUser : boolean;
  horizontal: MatSnackBarHorizontalPosition = 'center';
  vertical: MatSnackBarVerticalPosition = 'top';

  ngOnInit(): void {
   
    this.loginService.getUsers().subscribe(
      (data)=> {
          
          this.allUser = data;
      }  ,(error)=>{
        console.log(error);
          this._snackBar.open('Internal Server Error. Please try again later','',{});
      }      
      );

  }

  constructor(private loginService : LoginService, private router: Router, private _snackBar: MatSnackBar) { }
  
  loginForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', Validators.required)
  })


  getErrorMessage() {
    if (this.loginForm.get('userEmail').hasError('required')) {
      return 'You must enter a value';
    }
    return this.loginForm.get('userEmail').hasError('email') ? 'Not a valid email' : '';
  }

  getErrorPassword() {
    if (this.loginForm.get('userPassword').hasError('required')) {
      return 'You must enter a value';
    }
  }
  
  

  

  validateLogin() {


    let currUser = new user()
    currUser.email = this.loginForm.get('userEmail').value
    currUser.password = this.loginForm.get('userPassword').value

    // this.allUser.forEach(
    //   user =>
    //   {
    //     // console.log(user);
    //     console.log('checking form value ' + this.loginForm.get('userEmail').value + this.loginForm.get('userPassword').value);
    //     if (user.email.match(this.loginForm.get('userEmail').value) && user.password.match(this.loginForm.get('userPassword').value)) {
    //       // user found, validate
    //         this.authUser = true;
    //     }
    //   }
    // )
    

    this.loginService.userLogin(currUser).subscribe(
      (data)=> {
          console.log("checking login data "+data);
          if (data == true){
            this.authUser = true;
          }
      }  ,(error)=>{
        console.log(error);
          this._snackBar.open('Internal Server Error. Please try again later','',{});
      }      
      );



    
    if (this.authUser == true) {
      // move to homepage
      console.log('User' + this.loginForm.get('userEmail').value +  'is now logged in');
      this._snackBar.open('Login successful', 'OK',{}).afterDismissed().subscribe(()=>{
        this.router.navigate(['/app-home-page']);
      });
    }
    else {
      // display error message
      this.errorMessage = 'Username or password is wrong, please try again';
      this._snackBar.open('Login Unsuccessful', 'OK',{});
    }
    



  }

}

