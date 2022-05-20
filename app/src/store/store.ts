import toast from 'react-hot-toast';

import { invoke } from '@tauri-apps/api/tauri';
import create from 'zustand';

import { Result } from '../types/Result';
import { State } from '../types/State';
import { Theme } from '../types/Theme';
import { TodoItem } from '../types/TodoItem';
import { TodoList } from '../types/TodoList';

export const useStore = create<State>((set, get) => ({
  todoLists: [],
  selectedTodoList: null,
  selectTodoList: (todoList: TodoList | null) => {
    set({ selectedTodoList: todoList });
  },
  getTodoLists: async () => {
    const result: Result<TodoList[], string> = await invoke('get_todo_lists');
    if (typeof result === 'string') {
      toast.error(`Something went wrong: ${result}`);
      return;
    }

    set({ todoLists: result });
  },
  createTodoList: async (name: string) => {
    const result: Result<TodoList, string> = await invoke('create_todo_list', {
      name,
    });

    if (typeof result === 'string') {
      toast.error(`Something went wrong: ${result}`);
      return;
    }

    set({
      todoLists: [...get().todoLists, result],
      selectedTodoList: result,
    });
  },
  deleteTodoList: async (listId: number) => {
    const result: Result<TodoList, string> = await invoke('delete_todo_list', {
      listId,
    });
    if (typeof result === 'string') {
      toast.error(`Something went wrong: ${result}`);
      return;
    }

    set({
      todoLists: [
        ...get().todoLists.filter((todoList) => todoList.id !== listId),
      ],
      selectedTodoList: null,
    });
  },
  renameTodoList: async (listId: number, newName: string) => {
    const result: Result<TodoList, string> = await invoke('rename_todo_list', {
      listId,
      newName,
    });

    if (typeof result === 'string') {
      toast.error(`Something went wrong: ${result}`);
      return;
    }

    set({
      todoLists: [
        ...get().todoLists.map((todoList) => {
          if (todoList.id === listId) {
            todoList = result;
          }

          return todoList;
        }),
      ],
    });
  },
  createTodoItem: async (listId: number, todoText: string) => {
    const result: Result<TodoItem, string> = await invoke('create_todo_item', {
      listId,
      todoText,
    });

    if (typeof result === 'string') {
      toast.error(`Something went wrong: ${result}`);
      return;
    }

    set({
      todoLists: [
        ...get().todoLists.map((todoList) => {
          if (todoList.id === listId) {
            todoList.todos.push(result);
          }

          return todoList;
        }),
      ],
    });
  },
  updateTodoItemComplete: async (
    listId: number,
    todoId: number,
    complete: boolean
  ) => {
    const result: Result<TodoItem, string> = await invoke(
      'update_todo_item_complete',
      {
        listId,
        todoId,
        complete,
      }
    );

    if (typeof result === 'string') {
      toast.error(`Something went wrong: ${result}`);
      return;
    }

    set({
      todoLists: [
        ...get().todoLists.map((todoList) => {
          if (todoList.id === listId) {
            todoList.todos = todoList.todos.map((todoItem) => {
              return todoItem.id === todoId ? result : todoItem;
            });
          }

          return todoList;
        }),
      ],
    });
  },
  deleteTodoItem: async (listId: number, todoId: number) => {
    const result: Result<TodoItem, string> = await invoke('delete_todo_item', {
      todoId,
    });
    if (typeof result === 'string') {
      toast.error(`Something went wrong: ${result}`);
      return;
    }

    set({
      todoLists: [
        ...get().todoLists.map((todoList) => {
          if (todoList.id === listId) {
            todoList.todos = todoList.todos.filter(
              (todoItem) => todoItem.id !== todoId
            );
          }

          return todoList;
        }),
      ],
    });
  },
  theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  setTheme: (theme?: Theme) => {
    theme = theme ?? get().theme;
    theme === 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark');
    localStorage.setItem('theme', theme);
    set({ theme });
  },
}));
