import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicineService } from 'src/app/services/medecine.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
})
export class ViewOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
    private orderService: OrderService,
    private medicineService: MedicineService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    if (this.data && this.data.userId) {
      this.orderService.getOrdersByUserId(this.data.userId).subscribe((orders) => {
        this.orders = orders;
        this.orders.forEach((order, index) => {
          const medicineId = order.medicineId._id;
          this.medicineService.getMedicineByIdWithCategory(medicineId).subscribe(
            (medicine) => {
              this.orders[index].medicine = medicine;
              console.log('Medicine loaded:', medicine);
            },
            (error) => {
              console.error('Error loading medicine:', error);
            }
          );
        });
        console.log('Orders loaded:', this.orders);
      });
    }
  }
  
}
