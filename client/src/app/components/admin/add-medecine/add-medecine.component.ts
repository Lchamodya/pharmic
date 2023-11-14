import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicineService } from 'src/app/services/medecine.service';
import { CategoryService } from 'src/app/services/category.service';
import { Medicine } from 'src/app/models/medecine-model';

@Component({
  selector: 'app-add-medecine',
  templateUrl: './add-medecine.component.html',
})
export class AddMedecineComponent implements OnInit {
  medicineForm: FormGroup;
  selectedImage: File | null = null;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private categoryService: CategoryService
  ) {
    this.medicineForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  createMedicine() {
    if (this.medicineForm.valid) {
      const categoryId = this.medicineForm.controls['category'].value;
  
      const formData = new FormData();
      formData.append('name', this.medicineForm.controls['name'].value);
      formData.append('category', categoryId);
      formData.append('description', this.medicineForm.controls['description'].value);
      formData.append('amount', this.medicineForm.controls['amount'].value);
      formData.append('quantity', this.medicineForm.controls['quantity'].value);
  
      if (this.selectedImage) {
        formData.append('image', this.selectedImage as File);
      }
  
      this.medicineService.addMedicine(formData).subscribe(
        (createdMedicine) => {
          alert('Medicine created successfully: ' + createdMedicine.name);
          window.location.reload();
        },
        (error) => {
          console.error('Error creating medicine:', error);
        }
      );
    }
  }
  

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files[0];
    }
  }
}
