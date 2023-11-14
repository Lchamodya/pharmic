import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];

  constructor(public dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  openEditUserModal(user: any): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { user },
    });
  }

  deleteUser(userId: string, userName: string): void {
    const confirmation = window.confirm(`Are you sure you want to delete the user: ${userName}?`);
  
    if (confirmation) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.users = this.users.filter((user) => user.id !== userId);
          console.log('User deleted successfully');
          window.location.reload();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
  

  openAddUserModal(): void {
    const dialogRef = this.dialog.open(AddUserComponent);
  }
}
