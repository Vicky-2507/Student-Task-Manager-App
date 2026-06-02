import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  tasks: any[] = [];

  constructor(
    private auth: AuthService,
    private taskService: TaskService,
    private router: Router
  ) {
    //  AUTO UPDATE WHEN NAVIGATE
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadTasks();
      }
    });
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  get totalTasks(){
    return this.tasks.length;
  }

  get completedTasks(){
    return this.tasks.filter(t => t.status === 'Completed').length;
  }

  get pendingTasks(){
    return this.tasks.filter(t => t.status === 'Pending').length;
  }

  logout() {
    this.auth.logout();
  }
}