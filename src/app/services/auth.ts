import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7126/api/Auth';

  constructor(private http: HttpClient) {
  }

  register(user: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/register`,
      user
    );

  }

  login(user: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/login`,
      user
    );

  }

  logout(): void {

    localStorage.removeItem('user');

  }

  isLoggedIn(): boolean {

    return localStorage.getItem('user') !== null;

  }

}