import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart-model';
import { CartService } from 'src/app/services/cart.service';
import { MedicineService } from 'src/app/services/medecine.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  cartItems: Cart[] = [];

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private medicineService: MedicineService,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.populateItemDetails();
    });
  }

  populateItemDetails(): void {
    this.cartItems.forEach((item) => {
      this.userService.getUserById(item.userId).subscribe((user) => {
        item.user = user;
      });

      this.medicineService.getMedicineByIdWithCategory(item.medicineId).subscribe((medicine) => {
        item.medicine = medicine;
      });
    });
  }
  
  selectedPaymentOption: 'cashOnDelivery' | 'cardPayment' = 'cashOnDelivery';

  placeOrder() {
    this.orderService.createOrder().subscribe(
      () => {
        this.snackBar.open('Order placed successfully', 'Close', {
          duration: 2000,
      });
      },
      (error) => {
        console.error('Error placing order:', error);
      }
    );
  }
}
