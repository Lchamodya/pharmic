import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart-model';
import { CartService } from 'src/app/services/cart.service';
import { MedicineService } from 'src/app/services/medecine.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private medicineService: MedicineService,
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

  decrementQuantity(item: Cart): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCartItem(item).subscribe();
      this.snackBar.open('Cart updated successfully', 'Close', {
        duration: 2000,
    });
  }}

  incrementQuantity(item: Cart): void {
    item.quantity++;
    this.cartService.updateCartItem(item).subscribe();
    this.snackBar.open('Cart updated successfully', 'Close', {
      duration: 2000,
  });
  }

  removeFromCart(item: Cart): void {
    if (item._id) {
      this.cartService.removeFromCart(item._id).subscribe(() => {
        this.cartItems = this.cartItems.filter((cartItem) => cartItem._id !== item._id);
      });
      this.snackBar.open('Cart updated successfully', 'Close', {
        duration: 2000,
    });
    } else {
      console.error('Item does not have a valid ID');
    }
  }
  

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.medicine.amount * item.quantity, 0);
  }
}
