import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.signin({ email, password }).subscribe(
        (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'Invalid email or password';
        }
      );
    }
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  forgotPassword() {
    console.log('Forgot Password clicked');
  }
}
