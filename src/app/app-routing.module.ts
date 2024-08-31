import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TodoListComponent } from './flows/todo/todo-list/todo-list.component';
import { AuthGuard } from './guard/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'todos',
    component: LayoutComponent, // Use the layout component
    canActivate: [AuthGuard], // Protect this route with AuthGuard
    children: [
      { path: '', component: TodoListComponent }, // Default child route
      // Add more todo-related routes here if needed
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
