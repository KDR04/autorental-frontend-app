import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {


  registerForm!: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
        age: new FormControl('', [Validators.required, Validators.pattern('\\-?\\d*\\.?\\d{1,2}')]),
        email: new FormControl('', [Validators.required, Validators.email]),
        drivingLicense: new FormControl('', Validators.required)
    })
  }


  getErrorMessageEmail() {
    if (this.registerForm.get('email').hasError('required')) {
      return 'You must enter a value';
    } 
    return this.registerForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }
 getErrorMessagePassword(){
    
    // if(this.registerForm.get('password').value > 8 ){
    //   return 'Length of value must be between 6 to 8';
    // }else{
      if(this.registerForm.get('password').hasError('required')){
        return 'You must enter a value. Size should be between 6 to 8';
      }
    // }
  }
  getErrorMessageAge(){

      if(this.registerForm.get('age').value < 18){
        return 'You must enter value of age more than 18.'
      }
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
}

}
