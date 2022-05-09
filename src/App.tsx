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

  function handleDeleteTodoList(uuid: string): void {
    const updatedTodoLists = [
      ...todoLists.filter((todoList: TodoList) => todoList.id !== uuid),
    ];

    invoke('write_todo_lists', {
      todoLists: JSON.stringify(updatedTodoLists),
    });

    setSelectedTodoList(null);
    setTodoLists(updatedTodoLists);
  }

  return (
    <div className="bg-slate-100 flex flex-row h-screen w-screen">
      <Sidebar
        onCreateTodoList={(name: string) => handleCreateTodoList(name)}
        onSelectTodoList={(todoList: TodoList) => setSelectedTodoList(todoList)}
        todoLists={todoLists}
      />
      {selectedTodoList && (
        <TodoListComponent
          onDeleteTodoList={(uuid: string) => handleDeleteTodoList(uuid)}
          todoList={selectedTodoList}
        />
      )}
      {!selectedTodoList && <div>select a list</div>}
    </div>
  );
}
