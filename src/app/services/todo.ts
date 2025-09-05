import { computed, effect, Injectable, signal } from '@angular/core';
import { Todo } from '../model/todo.model';

type Filters = 'all' | 'active' | 'completed';
const STORAGE_KEY = 'todos_v1';
export interface Stats {
  total: number;
  completed: number;
  active: number;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todos = signal<Todo[]>(this.load());
  readonly filter = signal<Filters>('all');

  readonly filteredTodos = computed(() => {
    const f = this.filter();
    const items = this.todos();
    if (f === 'active') return items.filter((item) => !item.completed);
    if (f === 'completed') return items.filter((item) => item.completed);
    return items;
  });

  readonly stats = computed<Stats>(() => {
    const items = this.todos();
    const completed = items.filter((t) => t.completed).length;
    return { total: items.length, completed, active: items.length - completed };
  });

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos()));
    });
  }

  add(title: string) {
    const t = title.trim();
    if (!t) return;
    const todo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    this.todos.update((list) => [...list, todo]);
  }

  toggle(id: string) {
    this.todos.update((list) =>
      list.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  rename(id: string, title: string) {
    this.todos.update((list) =>
      list.map((t) => (t.id === id ? { ...t, title } : t))
    );
  }

  remove(id: string) {
    this.todos.update((list) => list.filter((t) => t.id !== id));
  }

  private load(): Todo[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Todo[]) : [];
    } catch {
      return [];
    }
  }
}
