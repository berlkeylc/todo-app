import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }
  
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: Todo[] = [
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Walk the dog', completed: true },
    { id: 3, title: 'Read a book', completed: false }
  ];

  constructor() { }

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleTodoCompletion(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }
}
