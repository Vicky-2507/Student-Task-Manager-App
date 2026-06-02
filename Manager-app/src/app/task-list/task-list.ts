import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../service/task.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {

  tasks: any[] = [];

  showDeletePopup = false;
  selectedTask: any = null;

  // TOAST STATE
  showDeleteToast = false;

  constructor(
    private router: Router,
    // private route: ActivatedRoute,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef 
  ) {
    // AUTO REFRESH WHEN NAVIGATE
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.tasks = this.taskService.getTasks();
      }
    });
  }

  // DEFAULT TASKS
  defaultTasks = [
    {
      id: 101,
      title: 'Design UI Layout',
      assignedTo: 'Aravindh',
      priority: 'High',
      dueDate: '2026-04-20',
      status: 'Completed'
    },
    {
      id: 102,
      title: 'Fix Routing Issue',
      assignedTo: 'Tamil',
      priority: 'Medium',
      dueDate: '2026-04-18',
      status: 'Pending'
    },
    {
      id: 103,
      title: 'Form Validation',
      assignedTo: 'Vicky',
      priority: 'High',
      dueDate: '2026-04-18',
      status: 'Pending'
    },
    {
      id: 104,
      title: 'Test case',
      assignedTo: 'Gowtham',
      priority: 'Low',
      dueDate: '2026-04-18',
      status: 'Completed'
    }
  ];

  ngOnInit() {
    const saved = this.taskService.getTasks();

    if (saved.length > 0) {
      this.tasks = saved;
    } else {
      this.tasks = this.defaultTasks;
      this.taskService.saveTasks(this.tasks);
    }
  }

  // ADD TASK
  addTaskPage() {
    this.router.navigate(['/add-task']);
  }

  // VIEW TASK
  viewTask(task: any) {
    this.router.navigate(['/task', task.id,]); 
//     this.router.navigate(['/task'], {
//   queryParams: { id: task.id }
// });
    console.log(task.id)
  }

  // OPEN DELETE POPUP
  deleteTask(task: any) {
    this.selectedTask = task;
    this.showDeletePopup = true;
  }

  // CONFIRM DELETE 
  confirmDelete() {
  this.tasks = this.tasks.filter(
    (t: any) => t.id !== this.selectedTask.id
  );

  this.taskService.saveTasks(this.tasks);

  this.showDeletePopup = false;
  this.selectedTask = null;

  // FORCE CHANGE DETECTION SAFE
  Promise.resolve().then(() => {
    this.showDeleteToast = true;

    setTimeout(() => {
      this.showDeleteToast = false;
      this.cdr.detectChanges();
    }, 2000);
  });
}
  // CANCEL DELETE
  cancelDelete() {
    this.showDeletePopup = false;
    this.selectedTask = null;
  }
}
