import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { MedicineService } from 'src/app/services/medecine.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})

export class ProductsComponent implements OnInit {
  medecines: any[] = [];
  cartIcon = faShoppingCart;

  constructor(private medicineService: MedicineService) {}

  ngOnInit(): void {
    this.medicineService.getAllMedicinesWithCategories().subscribe(
      (medecine) => {
        this.medecines = medecine;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

}
