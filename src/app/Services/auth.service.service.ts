import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url = "https://dummyjson.com";

  constructor(private http:HttpClient) {}

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
    });
  }

   getCurrentUser(token: string): Observable<any> {
    return this.http.get(`${this.url}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

}
