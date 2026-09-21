export interface CreateTagInput {
  title: string;
  icon: string;
  color: string;
}

export interface Tag {
  id: number;
  title: string;
  color: string;
  icon: string;
  task_count: number;
}
