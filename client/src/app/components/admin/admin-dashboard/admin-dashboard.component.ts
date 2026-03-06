import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AddMedecineComponent } from '../add-medecine/add-medecine.component';
import { MedicineService } from 'src/app/services/medecine.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  links = [
    { label: 'Dashboard', url: '/admin' },
    { label: 'Categories', url: '/admin/categories' },
    { label: 'Medecines', url: '/admin/medecines' },
    { label: 'Orders', url: '/admin/orders' },
    { label: 'Users', url: '/admin/users' },
    { label: 'Settings', url: '/admin/settings' },
  ]

  totalMedicines = 0;
  totalOrders = 0;
  totalUsers = 0;
  totalRevenue = 0;

  constructor(
    public dialog: MatDialog,
    private medicineService: MedicineService,
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    forkJoin({
      medicines: this.medicineService.getAllMedicines(),
      orders: this.orderService.getOrders(),
      users: this.userService.getAllUsers()
    }).subscribe({
      next: (data) => {
        this.totalMedicines = data.medicines.length;
        this.totalOrders = data.orders.length;
        this.totalUsers = data.users.length;
        
        // Calculate revenue from orders
        this.totalRevenue = data.orders.reduce((sum, order: any) => {
          const medicinePrice = order.medicine?.amount || 0;
          const quantity = order.quantity || 0;
          return sum + (medicinePrice * quantity);
        }, 0);
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
      }
    });
  }

  openAddCategoryModal(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent);
  }

  openAddMedecineModal(): void {
    const dialogRef = this.dialog.open(AddMedecineComponent);
  }
}
