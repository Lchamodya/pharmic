import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewOrdersComponent } from '../../view-orders/view-orders.component';
import { OrderService } from 'src/app/services/order.service';
import { MedicineService } from 'src/app/services/medecine.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
})
export class UserOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(
    public dialog: MatDialog,
    private orderService: OrderService, 
    private medicineService: MedicineService,
    private userService: UserService
    ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe((items) => {
      this.orders = items;
      this.populateOrderDetails();
    });
  }

  populateOrderDetails(): void {
    const uniqueUserIds = new Set<string>();
  
    this.orders.forEach((item) => {
      uniqueUserIds.add(item.userId);
  
      this.medicineService.getMedicineByIdWithCategory(item.medicineId).subscribe((medicine) => {
        item.medicine = medicine;
      });
    });
  
    uniqueUserIds.forEach(userId => {
      this.userService.getUserById(userId).subscribe((user) => {
        this.orders.find(order => order.userId === userId).user = user;
      });
    });
  
    console.log(this.orders);
  }
  
  openViewOrderModal(userId: string): void {
    const dialogRef = this.dialog.open(ViewOrdersComponent, {
      data: { userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  deleteOrder(userId: string): void {
    this.orderService.deleteOrder(userId).subscribe(
      () => {
        this.loadOrders();
      },
      (error) => {
        console.error('Error deleting order:', error);
      }
    );
  }
}
