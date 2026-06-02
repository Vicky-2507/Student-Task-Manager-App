import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username = '';
  password = '';
  submitted = false;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  login(form: any) {
    this.submitted = true;
    this.errorMessage = '';
    console.log("Inside Form submit")

    if (form.invalid) return;
      console.log("inside the log")
      console.log(this.username, this.password)
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.errorMessage = err.message;
      }
    });
  }
  onInputChange() {
  this.errorMessage = '';
}

  //  NAVIGATE TO REGISTER
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
