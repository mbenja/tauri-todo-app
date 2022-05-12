import { invoke } from '@tauri-apps/api/tauri';
import { useEffect, useState } from 'react';

import Sidebar from './components/Sidebar';
import TodoListComponent from './components/TodoList';
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
    const todoLists: TodoList[] = JSON.parse(await invoke('read_todo_lists'));
    setTodoLists(todoLists);
  }

  async function handleCreateTodoList(name: string): Promise<void> {
    const uuid: string = await invoke('get_uuid');
    const newTodoList = { id: uuid, name, todos: [] };
    const updatedTodoLists = [...todoLists, newTodoList];

    invoke('write_todo_lists', {
      todoLists: JSON.stringify(updatedTodoLists),
    });

    setTodoLists(updatedTodoLists);
    setSelectedTodoList(newTodoList);
  }

  function handleRenameTodoList(listId: string, newName: string): void {
    const todoListIndex = todoLists.findIndex((list) => list.id === listId);
    if (todoListIndex !== -1) {
      const updatedTodoLists = [...todoLists];
      updatedTodoLists[todoListIndex].name = newName;

      invoke('write_todo_lists', {
        todoLists: JSON.stringify(updatedTodoLists),
      });

      setTodoLists(updatedTodoLists);

      if (selectedTodoList?.id === listId) {
        setSelectedTodoList({
          ...updatedTodoLists[todoListIndex],
        });
      }
    }
  }

  function handleDeleteTodoList(listId: string): void {
    const updatedTodoLists = [
      ...todoLists.filter((todoList: TodoList) => todoList.id !== listId),
    ];

    invoke('write_todo_lists', {
      todoLists: JSON.stringify(updatedTodoLists),
    });

    setSelectedTodoList(null);
    setTodoLists(updatedTodoLists);
  }

  async function handleCreateTodoItem(
    listId: string,
    todoItemText: string
  ): Promise<void> {
    const todoListIndex = todoLists.findIndex((list) => list.id === listId);
    if (todoListIndex !== -1) {
      const uuid: string = await invoke('get_uuid');
      const newTodoItem = { id: uuid, text: todoItemText, complete: false };
      const updatedTodoLists = [...todoLists];

      updatedTodoLists[todoListIndex].todos.push(newTodoItem);

      invoke('write_todo_lists', {
        todoLists: JSON.stringify(updatedTodoLists),
      });

      setTodoLists(updatedTodoLists);

      if (selectedTodoList?.id === listId) {
        setSelectedTodoList({
          ...updatedTodoLists[todoListIndex],
        });
      }
    }
  }

  function handleUpdateTodoItemComplete(
    listId: string,
    todoItemId: string,
    complete: boolean
  ): void {
    const todoListIndex = todoLists.findIndex((list) => list.id === listId);
    if (todoListIndex !== -1) {
      const updatedTodoLists = [...todoLists];
      const todoItemIndex = updatedTodoLists[todoListIndex].todos.findIndex(
        (todo) => todo.id === todoItemId
      );
      if (todoItemIndex !== -1) {
        updatedTodoLists[todoListIndex].todos[todoItemIndex].complete =
          complete;

        invoke('write_todo_lists', {
          todoLists: JSON.stringify(updatedTodoLists),
        });

        setTodoLists(updatedTodoLists);

        if (selectedTodoList?.id === listId) {
          setSelectedTodoList({ ...updatedTodoLists[todoListIndex] });
        }
      }
    }
  }

  function handleDeleteTodoItem(listId: string, todoItemId: string): void {
    const todoListIndex = todoLists.findIndex((list) => list.id === listId);
    if (todoListIndex !== -1) {
      const updatedTodoLists = [...todoLists];
      updatedTodoLists[todoListIndex].todos = updatedTodoLists[
        todoListIndex
      ].todos.filter((todo) => todo.id !== todoItemId);

      invoke('write_todo_lists', {
        todoLists: JSON.stringify(updatedTodoLists),
      });

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
          onCreateTodoItem={(listId: string, todoItemText: string) =>
            handleCreateTodoItem(listId, todoItemText)
          }
          onRenameTodoList={(listId: string, newName: string) =>
            handleRenameTodoList(listId, newName)
          }
          onDeleteTodoList={(listId: string) => handleDeleteTodoList(listId)}
          onDeleteTodoItem={(listId: string, todoItemId: string) =>
            handleDeleteTodoItem(listId, todoItemId)
          }
          onUpdateTodoItemComplete={(
            listId: string,
            todoId: string,
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
