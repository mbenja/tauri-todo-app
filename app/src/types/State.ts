import { TodoList } from './TodoList';

export type State = {
  todoLists: TodoList[];
  selectedTodoList: TodoList | null;
  selectTodoList: (todoList: TodoList | null) => void;
  getTodoLists: () => void;
  createTodoList: (name: string) => void;
  deleteTodoList: (listId: number) => void;
  renameTodoList: (listId: number, newName: string) => void;
  createTodoItem: (listId: number, todoText: string) => void;
  updateTodoItemComplete: (
    listId: number,
    todoId: number,
    complete: boolean
  ) => void;
  deleteTodoItem: (listId: number, todoId: number) => void;
};
