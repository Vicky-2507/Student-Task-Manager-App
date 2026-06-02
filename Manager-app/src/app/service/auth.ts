import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string) {
   
    return this.http.post<any>('/login', { username, password });
  }

  register(user: any) {
    return this.http.post<any>('/register', user);
  }

  logout() {
    localStorage.removeItem('token');
    // localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== '';
  }
}