import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  saveTasks(tasks: any[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  updateTask(updatedTask: any) {
    let tasks = this.getTasks();

    tasks = tasks.map((t: any) =>
      t.id === updatedTask.id ? updatedTask : t
    );

    this.saveTasks(tasks);
  }
}