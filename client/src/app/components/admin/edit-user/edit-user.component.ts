import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent {
  userForm: FormGroup;
  user: any;
  roles: string[] = ['Admin', 'User'];

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any },
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.user = data.user;
    this.userForm = this.fb.group({
      userId: [this.user._id],
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      mobile: [this.user.mobile, [Validators.required]],
      address: [this.user.address, [Validators.required]],
      role: [this.user.role, [Validators.required]],
      password: [''],
      confirmPassword: [''],
    });
  }

  editUser() {
    if (this.userForm.valid) {
      const userId = this.userForm.controls['userId'].value;
      const userData = this.userForm.value;

      this.userService.updateUser(userId, userData).subscribe(
        (updatedUser) => {
          console.log('User updated successfully:', updatedUser);
          this.dialogRef.close(updatedUser);
          window.location.reload();
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
