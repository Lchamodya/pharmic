import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Cart } from '../models/cart-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:12000/api/cart';

  constructor(private http: HttpClient,private authService: AuthService) {}

  getCartItems(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}`);
  }

  addToCart(item: any): Observable<Cart> {
    const authInfo = this.authService.getUser();

    if (!authInfo || !authInfo.id) {
      console.error('User not authenticated.');
      return throwError('User not authenticated.');
    }

    const cartItem = {
      userId: authInfo.id,
      medicineId: item.medicineId,
      quantity: item.quantity
    };

    return this.http.post<Cart>(`${this.apiUrl}`, cartItem);
  }

  updateCartItem(item: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/${item._id}`, item);
  }

  removeFromCart(itemId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${itemId}`);
  }
}
