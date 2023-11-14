import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category-model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private apiUrl = 'http://localhost:12000/api/category';

  constructor(private http: HttpClient) {}

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  updateCategory(categoryId: string, category: Category): Observable<Category> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.put<Category>(url, category);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategoryById(categoryId: string): Observable<Category> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.get<Category>(url);
  }

  deleteCategory(categoryId: string): Observable<void> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.delete<void>(url);
  }
}
