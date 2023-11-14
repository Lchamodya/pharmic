// add-user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;

  roles: string[] = ['Admin', 'User'];

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      address: ['', [Validators.required]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  addUser() {
    if (this.userForm.valid) {
      const userData: UserModel =  this.userForm.value;

      if (userData.password !== this.userForm.controls['confirmPassword'].value) {
        console.log('Password and confirm password do not match');
      } else {
        this.userService.createUser(userData).subscribe(
          (createdUser) => {
            console.log('User added successfully:', createdUser);
            this.userForm.reset();
            window.location.reload();
          },
          (error) => {
            console.error('Error adding user:', error);
          }
        );
      }
    }
  }
}
