import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { TaskList } from './task-list/task-list';
import { LayoutComponent } from './layout/layout';
import { authGuard } from './auth-guard';
import { TaskDetailComponent } from './task-details/task-details';
import { RegisterComponent } from './register/register';


export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tasks', component: TaskList },

      //  FIX: ADD TASK INSIDE LAYOUT
      { path: 'add-task', component: TaskDetailComponent },

      // EDIT TASK
      { path: 'task/:id', component: TaskDetailComponent }
      // { path: 'task', component: TaskDetailComponent }

    ]
  },

  { path: '**', redirectTo: 'login' }
];