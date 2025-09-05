import { Component, inject } from '@angular/core';
import { TodoService } from '../../../services/todo';

@Component({
  selector: 'app-todo-stats',
  imports: [],
  templateUrl: './todo-stats.html',
  styleUrl: './todo-stats.scss',
})
export class TodoStats {
  private readonly todos = inject(TodoService);
  readonly stats = this.todos.stats;
}
