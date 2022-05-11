import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';

import { TodoList } from '../types/TodoList';
import Button from './Button';
import DeleteListModal from './DeleteListModal';
import Input from './Input';
import { CheckIcon } from '@heroicons/react/solid';

type TodoListProps = {
  onCreateTodoItem: (listId: string, todoItemText: string) => void;
  onDeleteTodoList: (uuid: string) => void;
  todoList: TodoList;
};

export default function TodoListComponent(props: TodoListProps) {
  const { onCreateTodoItem, onDeleteTodoList, todoList } = props;

  const [deleteListModalOpen, setDeleteListModalOpen] = useState(false);
  const [newTodoItemText, setNewTodoItemText] = useState('');

  function handleOnCreateTodoItem(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    onCreateTodoItem(todoList.id, newTodoItemText);
    setNewTodoItemText('');
  }

  return (
    <div className="flex flex-col grow">
      <div className="flex flex-row justify-between px-4 py-2">
        <Button icon={<PencilIcon className="h-4 w-4" />} />
        <p className="font-medium ml-4 text-center text-2xl">{todoList.name}</p>
        <Button
          icon={<TrashIcon className="h-4 w-4" />}
          onClick={() => setDeleteListModalOpen(true)}
        />
      </div>
      <div className="flex flex-col grow">{JSON.stringify(todoList.todos)}</div>
      <form
        className="border border-gray-100 flex flex-row m-2 px-4 py-4 rounded-md shadow-sm"
        onSubmit={(e) => handleOnCreateTodoItem(e)}
      >
        <Input
          onChange={(v: string) => setNewTodoItemText(v)}
          placeholder="Create a new todo..."
          value={newTodoItemText}
        />
        <Button
          className="ml-2"
          icon={<CheckIcon className="h-4 w-4" />}
          variant="primary"
        />
      </form>
      <DeleteListModal
        open={deleteListModalOpen}
        onClose={() => setDeleteListModalOpen(false)}
        onDelete={() => onDeleteTodoList(todoList.id)}
      />
    </div>
  );
}
