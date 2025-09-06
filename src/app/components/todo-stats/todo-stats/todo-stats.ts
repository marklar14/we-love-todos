import { Component, inject } from '@angular/core';
import { TodoStore } from '../../../store/todo.store';

@Component({
  selector: 'app-todo-stats',
  imports: [],
  templateUrl: './todo-stats.html',
  styleUrl: './todo-stats.scss',
})
export class TodoStats {
  private readonly todos = inject(TodoStore);
  readonly stats = this.todos.stats;
}
