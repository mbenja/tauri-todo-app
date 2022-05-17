import { invoke } from '@tauri-apps/api/tauri';
import create from 'zustand';

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
    const todoLists: TodoList[] = await invoke('get_todo_lists');
    set({ todoLists: todoLists });
  },
  createTodoList: async (name: string) => {
    const newTodoList: TodoList = await invoke('create_todo_list', { name });
    set({
      todoLists: [...get().todoLists, newTodoList],
      selectedTodoList: newTodoList,
    });
  },
  deleteTodoList: async (listId: number) => {
    const result: TodoList = await invoke('delete_todo_list', { listId });
    set({
      todoLists: [
        ...get().todoLists.filter((todoList) => todoList.id !== listId),
      ],
      selectedTodoList: null,
    });
  },
  renameTodoList: async (listId: number, newName: string) => {
    const result: TodoList = await invoke('rename_todo_list', {
      listId,
      newName,
    });
    console.log('todoList:', result);
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
    const newTodo: TodoItem = await invoke('create_todo_item', {
      listId,
      todoText,
    });
    set({
      todoLists: [
        ...get().todoLists.map((todoList) => {
          if (todoList.id === listId) {
            todoList.todos.push(newTodo);
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
    const updatedTodo: TodoItem = await invoke('update_todo_item_complete', {
      listId,
      todoId,
      complete,
    });
    set({
      todoLists: [
        ...get().todoLists.map((todoList) => {
          if (todoList.id === listId) {
            todoList.todos = todoList.todos.map((todoItem) => {
              return todoItem.id === todoId ? updatedTodo : todoItem;
            });
          }

          return todoList;
        }),
      ],
    });
  },
  deleteTodoItem: async (listId: number, todoId: number) => {
    const result = await invoke('delete_todo_item', { todoId });
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
