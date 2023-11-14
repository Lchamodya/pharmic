import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  editUserForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
  }

  saveChanges() {
    if (this.editUserForm.valid) {
      const name = this.editUserForm.controls['name'].value;
      const email = this.editUserForm.controls['email'].value;
      const mobileNumber = this.editUserForm.controls['mobileNumber'].value;
      const address = this.editUserForm.controls['address'].value;
      const password = this.editUserForm.controls['password'].value;

      console.log('Updated User Data:', { name, email, mobileNumber, address, password });
    }
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }
}
