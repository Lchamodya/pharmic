import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cart } from '../models/cart-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:12000/api/cart';
  private cartItemsSubject = new BehaviorSubject<Cart[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient,private authService: AuthService) {
    // Load cart items on service initialization if user is authenticated
    const user = this.authService.getUser();
    if (user && user.id) {
      this.refreshCart();
    }
  }

  getCartItems(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}`).pipe(
      tap(items => this.cartItemsSubject.next(items))
    );
  }

  refreshCart(): void {
    this.getCartItems().subscribe(
      items => {},
      error => console.error('Error refreshing cart:', error)
    );
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

    return this.http.post<Cart>(`${this.apiUrl}`, cartItem).pipe(
      tap(() => this.refreshCart())
    );
  }

  updateCartItem(item: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/${item._id}`, item).pipe(
      tap(() => this.refreshCart())
    );
  }

  removeFromCart(itemId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${itemId}`).pipe(
      tap(() => this.refreshCart())
    );
  }
}
