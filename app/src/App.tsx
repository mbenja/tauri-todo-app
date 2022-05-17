import { useEffect } from 'react';

import Sidebar from './components/Sidebar';
import TodoListComponent from './components/TodoList';
import { useStore } from './store/store';

export default function App() {
  const getTodoLists = useStore((state) => state.getTodoLists);
  const todoLists = useStore((state) => state.todoLists);
  const selectedTodoList = useStore((state) => state.selectedTodoList);
  const selectTodoList = useStore((state) => state.selectTodoList);
  const setTheme = useStore((state) => state.setTheme);

  useEffect(() => {
    getTodoLists();
    setTheme();
  }, []);

  useEffect(() => {
    if (selectedTodoList) {
      selectTodoList(
        todoLists.find((todoList) => todoList.id === selectedTodoList.id) ??
          null
      );
    }
  }, [todoLists]);

  return (
    <div className="bg-gray-50 dark:bg-slate-800 dark:text-white flex flex-row h-screen w-screen">
      <Sidebar />
      {selectedTodoList && <TodoListComponent todoList={selectedTodoList} />}
      {!selectedTodoList && (
        <div className="flex grow h-full justify-center items-center">
          <p className="font-medium text-lg">Select a list to get started</p>
        </div>
      )}
    </div>
  );
}
