import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../service/auth';

@Component({
  selector: 'app-layout',
  standalone:true,
  imports: [RouterModule,CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class LayoutComponent {
  
  constructor (private auth:AuthService){}

  logout() {
  this.auth.logout();
}
}
