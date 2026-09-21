export type TaskTab = 'planned' | 'today' | 'completed';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  due_date: string | null;
  tag: string | null;
  created_at: string;
}
