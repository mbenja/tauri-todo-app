import { invoke } from '@tauri-apps/api/tauri';
import { useEffect, useState } from 'react';

import Sidebar from './components/Sidebar';
import TodoListComponent from './components/TodoList';
import { TodoItem } from './types/TodoItem';
import { TodoList } from './types/TodoList';

export default function App() {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [selectedTodoList, setSelectedTodoList] = useState<TodoList | null>(
    null
  );

  useEffect(() => {
    getTodoLists();
  }, []);

  async function getTodoLists(): Promise<void> {
    const todoLists: TodoList[] = await invoke('get_todo_lists');
    setTodoLists(todoLists);
  }

  async function handleCreateTodoList(name: string): Promise<void> {
    const newTodoList: TodoList = await invoke('create_todo_list', { newListName: name });
    setTodoLists([...todoLists, newTodoList]);
    setSelectedTodoList(newTodoList);
  }

  async function handleDeleteTodoList(listId: number): Promise<void> {
    const result = await invoke('delete_todo_list', {
      listId,
    });

    console.log(result);

    setTodoLists([...todoLists.filter((todoList: TodoList) => todoList.id !== listId)]);
    setSelectedTodoList(null);
  }

  async function handleRenameTodoList(listId: number, newName: string): Promise<void> {
    const result = await invoke('rename_todo_list', {
      listId,
      newName
    });

    const todoListIndex = todoLists.findIndex((list) => list.id === listId);
    if (todoListIndex !== -1) {
      const updatedTodoLists = [...todoLists];
      updatedTodoLists[todoListIndex].name = newName;

      setTodoLists(updatedTodoLists);

      if (selectedTodoList?.id === listId) {
        setSelectedTodoList({
          ...updatedTodoLists[todoListIndex],
        });
      }
    }
  }

  async function handleCreateTodoItem(
    listId: number,
    todoText: string
  ): Promise<void> {
    const newTodo: TodoItem = await invoke('create_todo_item', {
      listId, todoText
    });

    const todoListIndex = todoLists.findIndex((list) => list.id === listId);
    if (todoListIndex !== -1) {
      const updatedTodoLists = [...todoLists];

      updatedTodoLists[todoListIndex].todos.push(newTodo);

      setTodoLists(updatedTodoLists);

      if (selectedTodoList?.id === listId) {
        setSelectedTodoList({
          ...updatedTodoLists[todoListIndex],
        });
      }
    }
  }

  async function handleUpdateTodoItemComplete(
    listId: number,
    todoId: number,
    complete: boolean
  ): Promise<void> {
    const updatedTodo: TodoItem = await invoke('update_todo_item_complete', { listId, todoId, complete });
    console.log(updatedTodo);

    const todoListIndex = todoLists.findIndex((list) => list.id === listId);
    if (todoListIndex !== -1) {
      const updatedTodoLists = [...todoLists];
      const todoItemIndex = updatedTodoLists[todoListIndex].todos.findIndex(
        (todo) => todo.id === todoId
      );
      if (todoItemIndex !== -1) {
        updatedTodoLists[todoListIndex].todos[todoItemIndex] = updatedTodo;

        setTodoLists(updatedTodoLists);

        if (selectedTodoList?.id === listId) {
          setSelectedTodoList({ ...updatedTodoLists[todoListIndex] });
        }
      }
    }
  }

  async function handleDeleteTodoItem(listId: number, todoId: number): Promise<void> {
    await invoke('delete_todo_item', { todoId });

    const todoListIndex = todoLists.findIndex((list) => list.id === listId);
    if (todoListIndex !== -1) {
      const updatedTodoLists = [...todoLists];
      updatedTodoLists[todoListIndex].todos = updatedTodoLists[
        todoListIndex
      ].todos.filter((todo) => todo.id !== todoId);

      setTodoLists(updatedTodoLists);

      if (selectedTodoList?.id === listId) {
        setSelectedTodoList({ ...updatedTodoLists[todoListIndex] });
      }
    }
  }

  return (
    <div className="bg-gray-50 flex flex-row h-screen w-screen">
      <Sidebar
        onCreateTodoList={(name: string) => handleCreateTodoList(name)}
        onSelectTodoList={(todoList: TodoList) => setSelectedTodoList(todoList)}
        selectedTodoList={selectedTodoList}
        todoLists={todoLists}
      />
      {selectedTodoList && (
        <TodoListComponent
          onCreateTodoItem={(listId: number, todoItemText: string) =>
            handleCreateTodoItem(listId, todoItemText)
          }
          onRenameTodoList={(listId: number, newName: string) =>
            handleRenameTodoList(listId, newName)
          }
          onDeleteTodoList={(listId: number) => handleDeleteTodoList(listId)}
          onDeleteTodoItem={(listId: number, todoItemId: number) =>
            handleDeleteTodoItem(listId, todoItemId)
          }
          onUpdateTodoItemComplete={(
            listId: number,
            todoId: number,
            complete: boolean
          ) => handleUpdateTodoItemComplete(listId, todoId, complete)}
          todoList={selectedTodoList}
        />
      )}
      {!selectedTodoList && (
        <div className="flex grow h-full justify-center items-center">
          <p className="font-medium text-lg">Select a list to get started</p>
        </div>
      )}
    </div>
  );
}
