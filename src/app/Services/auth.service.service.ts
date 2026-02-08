import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProductsSharingServiceService } from './products.sharing.service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url = "https://dummyjson.com";

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
  private username = new BehaviorSubject<string>(
  localStorage.getItem('username') || ''
  );
  username$ = this.username.asObservable();



  constructor(private http:HttpClient , private productSharing : ProductsSharingServiceService) {}

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
      localStorage.setItem("userId", res.id.toString());
      this.isLoggedInSubject.next(true);
      this.productSharing.setUserId(res.id);
      this.username.next(res.username);
      localStorage.setItem("username" , res.username);
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
