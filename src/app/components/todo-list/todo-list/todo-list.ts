import { Component, inject } from '@angular/core';
import { TodoStore } from '../../../store/todo.store';
import { TodoFilter } from '../../todo-filter/todo-filter/todo-filter';
import { TodoStats } from '../../todo-stats/todo-stats/todo-stats';

@Component({
  selector: 'app-todo-list',
  imports: [TodoStats, TodoFilter],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList {
  private readonly todos = inject(TodoStore);
  readonly list = this.todos.filteredTodos;
  readonly stats = this.todos.stats;

  toggle(id: string) {
    this.todos.toggleTodo(id);
  }

  rename(id: string, title: string) {
    this.todos.renameTodo(id, title);
  }

  remove(id: string) {
    this.todos.removeTodo(id);
  }
}
