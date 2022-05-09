import { TodoItem } from './TodoItem';

export type TodoList = {
  id: string;
  name: string;
  todos: TodoItem[];
};
