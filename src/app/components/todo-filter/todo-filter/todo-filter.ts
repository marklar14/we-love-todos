import { Component, inject } from '@angular/core';
import { TodoService } from '../../../services/todo';

@Component({
  selector: 'app-todo-filter',
  imports: [],
  templateUrl: './todo-filter.html',
  styleUrl: './todo-filter.scss',
})
export class TodoFilter {
  private readonly todos = inject(TodoService);
  readonly filter = this.todos.filter;
}
