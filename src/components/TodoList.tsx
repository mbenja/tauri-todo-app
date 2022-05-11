import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';

import { TodoList } from '../types/TodoList';
import Button from './Button';
import DeleteListModal from './DeleteListModal';

type TodoListProps = {
  onDeleteTodoList: (uuid: string) => void;
  todoList: TodoList;
};

export default function TodoListComponent(props: TodoListProps) {
  const { onDeleteTodoList, todoList } = props;

  const [deleteListModalOpen, setDeleteListModalOpen] = useState(false);

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
      <DeleteListModal
        open={deleteListModalOpen}
        onClose={() => setDeleteListModalOpen(false)}
        onDelete={() => onDeleteTodoList(todoList.id)}
      />
    </div>
  );
}
