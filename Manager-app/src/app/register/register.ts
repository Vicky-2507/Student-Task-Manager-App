import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  username = '';
  password = '';
  confirmPassword = '';

  errorMessage = '';
  successMessage = '';

  constructor(private router: Router) {}

  register(form: any) {
    this.errorMessage = '';
    this.successMessage = '';

    if (form.invalid) return;

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    const exists = users.find((u: any) => u.username === this.username);

    if (exists) {
      this.errorMessage = 'User already exists';
      return;
    }

    users.push({
      username: this.username,
      password: this.password
    });

    localStorage.setItem('users', JSON.stringify(users));

    this.successMessage = 'Registration successful!  ';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }

  //  NAVIGATE TO LOGIN
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
