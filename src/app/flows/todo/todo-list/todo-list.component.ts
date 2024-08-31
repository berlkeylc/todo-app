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
  todoForm: FormGroup;
  todos: any[] = [];

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.todoForm = this.fb.group({
      text: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    if (this.todoForm.invalid) {
      return;
    }
    const text = this.todoForm.value.text;
    this.todoService.addTodo(text).then(() => {
      this.todoForm.reset();
      this.loadTodos();
    });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).then(() => {
      this.loadTodos();
    });
  }
}
