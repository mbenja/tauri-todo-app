import { TodoItem } from './TodoItem';

export type TodoList = {
  id: number;
  name: string;
  todos: TodoItem[];
};
