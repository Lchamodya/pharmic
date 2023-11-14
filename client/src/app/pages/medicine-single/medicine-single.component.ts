import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { MedicineService } from 'src/app/services/medecine.service';

@Component({
  selector: 'app-medicine-single',
  templateUrl: './medicine-single.component.html',
})
export class MedicineSingleComponent implements OnInit {
  cartIcon = faShoppingCart;
  medicine: any;
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicineService: MedicineService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const medicineId = params['id'];

      this.medicineService.getMedicineByIdWithCategory(medicineId).subscribe(
        (medicine) => {
          this.medicine = medicine;
        },
        (error) => {
          console.error('Error fetching medicine details:', error);
        }
      );
    });
  }

  addToCart() {
    const cartItem = {
      medicineId: this.medicine._id,
      quantity: this.selectedQuantity,
    };
    console.log(cartItem);

    this.cartService.addToCart(cartItem).subscribe(
      () => {
        console.log('Item added to cart successfully');
        this.router.navigate(['/cart']);
      },
      (error) => {
        console.error('Error adding item to cart:', error);
      }
    );
  }

  decreaseQuantity() {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }

  increaseQuantity() {
    this.selectedQuantity++;
  }
}
