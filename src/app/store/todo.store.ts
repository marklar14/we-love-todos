import { effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Filters, Todo } from '../model/todo.model';

const STORAGE_KEY = 'todos_v1';

function loadFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Todo[];
    return parsed;
  } catch {
    return [];
  }
}

export interface TodoStore {
  todos: Todo[];
  filters: Filters;
}

export const initialTodoStore: TodoStore = {
  todos: loadFromStorage(),
  filters: 'all',
};

export const TodoStore = signalStore(
  withState(initialTodoStore),
  withMethods((store) => ({
    addTodo: (title: string) => {
      const todo: Todo = {
        id: crypto.randomUUID(),
        title,
        completed: false,
        createdAt: new Date(),
      };
      patchState(store, { todos: [...store.todos(), todo] });
    },

    setFilter: (filter: Filters) => {
      patchState(store, { filters: filter });
    },

    removeTodo: (id: string) => {
      patchState(store, {
        todos: store.todos().filter((todo) => todo.id !== id),
      });
    },

    toggleTodo: (id: string) => {
      patchState(store, {
        todos: store
          .todos()
          .map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
      });
    },

    renameTodo: (id: string, title: string) => {
      patchState(store, {
        todos: store
          .todos()
          .map((todo) => (todo.id === id ? { ...todo, title } : todo)),
      });
    },
  })),
  withComputed((store) => ({
    filteredTodos: () => {
      const f = store.filters();
      const items = store.todos();
      if (f === 'active') return items.filter((i) => !i.completed);
      if (f === 'completed') return items.filter((i) => i.completed);
      return items;
    },
    stats: () => {
      const items = store.todos();
      return {
        total: items.length,
        active: items.filter((i) => !i.completed).length,
        completed: items.filter((i) => i.completed).length,
      };
    },
  })),
  withHooks((store) => ({
    onInit() {
      effect(() => {
        const todos = store.todos();
        if (todos.length === 0) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      });
    },
  }))
);
