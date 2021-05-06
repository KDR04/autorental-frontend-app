import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {


  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    drivingLicense: new FormControl('', Validators.required)
  })


  getErrorMessage() {
    if (this.registerForm.hasError('required')) {
      return 'You must enter a value';
    }
  }


  constructor() { }

  ngOnInit(): void {
  }

}
