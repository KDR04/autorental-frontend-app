import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { user } from '../models/user';
import { LoginService } from '../service/login.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  users: user;
  registerForm!: FormGroup;
  horizontal: MatSnackBarHorizontalPosition = 'center';
  vertical: MatSnackBarVerticalPosition = 'top';

  constructor(private fb: FormBuilder, private loginService: LoginService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
        age: new FormControl('', [Validators.required, Validators.pattern('\\-?\\d*\\.?\\d{1,2}')]),
        email: new FormControl('', [Validators.required, Validators.email]),
        drivingLicense: new FormControl('', Validators.required),
        phoneNumber: new FormControl('',[Validators.required, Validators.pattern('\\-?\\d*\\.?\\d{1,2}')])
        // confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)])
    });
  }


  getErrorMessageEmail() {
    if (this.registerForm.get('email').hasError('required')) {
      return 'You must enter a value';
    } 
    return this.registerForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }
 getErrorMessagePassword(){
    
  // if(this.registerForm.get('password').value != this.registerForm.get('confirmPassword').value ){
  //   return 'both password and confirm password fileds should be same';
  // }

  if(this.registerForm.get('password').hasError('required')){
    return 'You must enter a value. Length should be more than 6';
  }
      
  }
  getErrorMessageAge(){
      return this.registerForm.get('age').hasError('required') ? 'You must enter a value.' : '';
  }


getErrorMessage() {
  if (this.registerForm.get('firstName').hasError('required')) {
    return 'You must enter a value';
  } 
  if (this.registerForm.get('lastName').hasError('required')) {
    return 'You must enter a value';
  } 
  if(this.registerForm.get('drivingLicense').hasError('required')){
    return 'You must enter a value';
  } 
  if(this.registerForm.get('phoneNumber').hasError('required')){
    return 'You must enter a value';
  }
  
  // if(this.registerForm.get('confirmPassword').hasError('required')){
  //   return 'You must enter a value. Length should be more than 6';
  // }
}


// add user


registerUser(){
  this.users = new user();
  this.users.firstname = this.registerForm.get('firstName').value;
  this.users.lastname = this.registerForm.get('lastName').value;
  this.users.password = this.registerForm.get('password').value;
  this.users.age = this.registerForm.get('age').value;
  this.users.email = this.registerForm.get('email').value;
  this.users.phonenumber = this.registerForm.get('phoneNumber').value;
  this.users.drivinglicense = this.registerForm.get('drivingLicense').value;

  this.loginService.postUsers(this.users).subscribe(
    (data)=> {
      this._snackBar.open('Successfully added user', 'OK', {}).afterDismissed().subscribe(
        ()=>{
          setTimeout(() => {
            this.router.navigate(['/app-login-page']);
          },1500);
        }
      );
}  ,(error)=>{
console.log(error);
  this._snackBar.open('User registration unsuccessful', 'OK', {});
}  
  );
}

}
