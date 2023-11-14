import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
})
export class EditCategoryComponent {
  categoryForm: FormGroup;
  category: any;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: any },
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.category = data.category;
    this.categoryForm = this.fb.group({
      _id: [String(this.category._id), [Validators.required]], // Convert ObjectId to string
      name: [this.category.name, [Validators.required]],
      description: [this.category.description, [Validators.required]],
    });
  }

  updateCategory() {
    if (this.categoryForm.valid) {
      const updatedCategory = this.categoryForm.value;

      this.categoryService.updateCategory(updatedCategory._id, updatedCategory)
        .subscribe(
          (updatedCategory) => {
            console.log('Category updated successfully:', updatedCategory);
            this.dialogRef.close(updatedCategory);
            window.location.reload();
          },
          (error) => {
            console.error('Error updating category:', error);
          }
        );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

