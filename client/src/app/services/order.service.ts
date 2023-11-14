import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:12000/api/order';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createOrder(): Observable<Order> {
    const authInfo = this.authService.getUser();

    if (!authInfo || !authInfo.id) {
      console.error('User not authenticated.');
    }
    return this.http.get<Order>(`${this.apiUrl}/add/${authInfo.id}`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  updateOrder(orderId: string, updatedOrder: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}`, updatedOrder);
  }

  deleteOrder(orderId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`);
  }

  getOrdersByUserId(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
  }

  getOrdersByUser(): Observable<Order[]> {
    const authInfo = this.authService.getUser();

    console.log(authInfo);
    if (!authInfo || !authInfo.id) {
      console.error('User not authenticated.');
    }
    return this.http.get<Order[]>(`${this.apiUrl}/user/${authInfo.id}`);
  }
}
