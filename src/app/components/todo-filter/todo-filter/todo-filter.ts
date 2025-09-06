import { Component, inject } from '@angular/core';
import { TodoStore } from '../../../store/todo.store';
import { Filters } from '../../../model/todo.model';

@Component({
  selector: 'app-todo-filter',
  imports: [],
  templateUrl: './todo-filter.html',
  styleUrl: './todo-filter.scss',
})
export class TodoFilter {
  private readonly todos = inject(TodoStore);
  readonly filter = this.todos.filters;

  setFilter(filter: Filters) {
    this.todos.setFilter(filter);
  }
}
