import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoStore } from '../../../store/todo.store';

@Component({
  selector: 'app-todo-add',
  imports: [FormsModule],
  templateUrl: './todo-add.html',
  styleUrl: './todo-add.scss',
})
export class TodoAdd {
  private readonly todos = inject(TodoStore);
  newTitle = signal('');

  onEnter() {
    this.add();
  }
  add() {
    this.todos.addTodo(this.newTitle());
  }
}
