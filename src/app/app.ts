import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from './components/header/header/header';
import { TodoAdd } from './components/todo-add/todo-add/todo-add';
import { TodoList } from './components/todo-list/todo-list/todo-list';
import { TodoStore } from './store/todo.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [FormsModule, Header, TodoAdd, TodoList],
  styleUrl: './app.scss',
  providers: [TodoStore],
})
export class App {
  protected title = 'we-love-todos';
}
