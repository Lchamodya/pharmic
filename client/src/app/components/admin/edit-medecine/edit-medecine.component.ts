import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { MedicineService } from 'src/app/services/medecine.service';

@Component({
  selector: 'app-edit-medecine',
  templateUrl: './edit-medecine.component.html',
})
export class EditMedecineComponent implements OnInit {
  medicineForm: FormGroup;
  medicine: any;
  selectedImage: File | null = null;
  categories: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditMedecineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { medicineData: any },
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private categoryService: CategoryService
  ) {
    this.medicine = data.medicineData;
    this.medicineForm = this.fb.group({
      id: [this.medicine._id, [Validators.required]],
      name: [this.medicine.name, [Validators.required]],
      category: [this.medicine.category, [Validators.required]],
      description: [this.medicine.description, [Validators.required]],
      amount: [this.medicine.amount, [Validators.required]],
      quantity: [this.medicine.quantity, [Validators.required]],
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  updateMedicine() {
    if (this.medicineForm.valid) {
      const medicineId = this.medicine.id;
      const medicineData = this.medicineForm.value;

      this.medicineService.updateMedicine(medicineId, medicineData, this.selectedImage).subscribe(
        (updatedMedicine) => {
          console.log('Medicine updated successfully:', updatedMedicine);
          this.dialogRef.close(updatedMedicine);
        },
        (error) => {
          console.error('Error updating medicine:', error);
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

  closeDialog(): void {
    this.dialogRef.close();
  }
}
