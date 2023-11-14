import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
})
export class AdminCategoriesComponent implements OnInit {
  categories: any[] = [];

  constructor(public dialog: MatDialog, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  openEditCategoryModal(category: any): void {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      data: { category },
    });
  }

  openDeleteConfirmationModal(categoryId: string): void {
    const message = 'Are you sure you want to delete this category?';

    if (confirm(message)) {
      this.categoryService.deleteCategory(categoryId).subscribe(
        () => {
          alert('Category deleted successfully');
          this.getCategories();
        },
        (error) => {
          console.error('Error deleting category:', error);
        }
      );
    }
  }

  openAddCategoryModal(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getCategories();
    });
  }

  private getCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}

