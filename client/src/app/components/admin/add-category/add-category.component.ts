import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category-model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  createCategory() {
    if (this.categoryForm.valid) {
      const categoryData: Category = this.categoryForm.value;

      this.categoryService.createCategory(categoryData).subscribe(
        (createdCategory) => {
          alert('Category created successfully:'+createdCategory.name);
        },
        (error) => {
          console.error('Error creating category:', error);
        }
      );
    }
  }
}
