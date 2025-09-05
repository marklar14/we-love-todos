import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../../../services/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-add',
  imports: [FormsModule],
  templateUrl: './todo-add.html',
  styleUrl: './todo-add.scss',
})
export class TodoAdd {
  private readonly todos = inject(TodoService);
  newTitle = signal('');

  onEnter() {
    this.add();
  }
  add() {
    this.todos.add(this.newTitle());
  }
}
