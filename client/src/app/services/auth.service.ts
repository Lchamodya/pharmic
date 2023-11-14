import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: any;

  constructor(private http: HttpClient) {}

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  initUserData(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable();
    }

    return this.http.get('http://localhost:12000/api/auth/getUser', {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    }).pipe(
      tap((data) => {
        this.setUser(data);
      })
    );
  }

  signup(userData: any): Observable<any> {
    return this.http.post('http://localhost:12000/api/auth/signup', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  signin(credentials: { email: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('http://localhost:12000/api/auth/signin', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).pipe(
      tap((data) => {
        localStorage.setItem('token', data.token);
      })
    );
  }
  
  logout() {
    localStorage.removeItem('token');
    this.user = null;
    window.location.href = '/';
  }
}
