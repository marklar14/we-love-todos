export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export type Filters = 'all' | 'active' | 'completed';

export interface Stats {
  total: number;
  active: number;
  completed: number;
}
