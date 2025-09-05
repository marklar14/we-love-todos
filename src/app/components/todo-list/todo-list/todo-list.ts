import { Component, inject } from '@angular/core';
import { TodoService } from '../../../services/todo';
import { TodoStats } from '../../todo-stats/todo-stats/todo-stats';
import { TodoFilter } from '../../todo-filter/todo-filter/todo-filter';

@Component({
  selector: 'app-todo-list',
  imports: [TodoStats, TodoFilter],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList {
  private readonly todos = inject(TodoService);
  readonly list = this.todos.filteredTodos;
  readonly stats = this.todos.stats;

  toggle(id: string) {
    this.todos.toggle(id);
  }

  rename(id: string, title: string) {
    this.todos.rename(id, title);
  }

  remove(id: string) {
    this.todos.remove(id);
  }
}
