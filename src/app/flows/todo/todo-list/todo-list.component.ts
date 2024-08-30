import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../services/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  todoForm: FormGroup;

  constructor(
    private todoService: TodoService,
    private fb: FormBuilder
  ) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
    });
  }

  toggleCompletion(todo: Todo): void {
    this.todoService.toggleTodoCompletion(todo.id);
  }

  addTodo(): void {
    if (this.todoForm.valid) {
      const newTodoTitle = this.todoForm.value.title.trim();

      // Prevent adding empty or duplicate To-Do items
      if (!newTodoTitle || this.todos.some(todo => todo.title.toLowerCase() === newTodoTitle.toLowerCase())) {
        return;
      }

      const newTodo: Todo = {
        id: this.todos.length ? Math.max(...this.todos.map(t => t.id)) + 1 : 1,
        title: newTodoTitle,
        completed: false
      };

      // Call the service to add the new To-Do
      this.todoService.addTodo(newTodo);

      // Update the local state
      this.todos = [...this.todos, newTodo];

      // Reset the form
      this.todoForm.reset();
    }
  }

  
  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

}

