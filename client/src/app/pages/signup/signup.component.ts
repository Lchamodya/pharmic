import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup): null | { passwordMismatch: boolean } {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
  
    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }
  
    if (passwordControl.value !== confirmPasswordControl.value) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
  

  signup() {
    if (this.signupForm.valid) {
      const userData: UserModel = this.signupForm.value;

      this.authService.signup(userData).subscribe(
        (response) => {
          console.log('Signup successful:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Signup error:', error);
          this.errorMessage = 'Signup failed. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields and make sure the passwords match.';
    }
  }
}
