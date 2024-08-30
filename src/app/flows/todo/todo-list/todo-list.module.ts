import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Ensure this is imported

  ]
})
export class TodoListModule { }
