import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url = "https://dummyjson.com";

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http:HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }


  signup(userData: any): Observable<any> {
    return this.http.post(`${this.url}/users/add`, {
      firstName: userData.userName,
      lastName: '',
      email: userData.email,
      phone: userData.phone || '',
      password: userData.password
    });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.url}/auth/login`, {
      username: credentials.email || credentials.username,
      password: credentials.password,
      expiresInMins: 30
    }).pipe(tap((res: any)=>{
      localStorage.setItem("token" , res.token);
      this.isLoggedInSubject.next(true);
    }));
  }

   getCurrentUser(token: string): Observable<any> {
    return this.http.get(`${this.url}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

}
