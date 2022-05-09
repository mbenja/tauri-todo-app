import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';

import Button from './Button';
import CreateListModal from './CreateListModal';
import { TodoList } from '../types/TodoList';

type SidebarProps = {
  onCreateTodoList: (name: string) => void;
  onSelectTodoList: (todoList: TodoList) => void;
  todoLists: TodoList[];
};

export default function Sidebar(props: SidebarProps) {
  const { onCreateTodoList, onSelectTodoList, todoLists } = props;

  const [createListModalOpen, setCreateListModalOpen] = useState(false);

  return (
    <div className="bg-slate-200 flex flex-col max-w-lg min-w-[200px] overflow-auto py-2 w-1/4">
      <div className="flex flex-row justify-between mb-2 px-4">
        <h2 className="flex self-end">Lists</h2>
        <Button
          icon={<PlusIcon />}
          onClick={() => setCreateListModalOpen(true)}
        />
      </div>
      <CreateListModal
        onClose={() => setCreateListModalOpen(false)}
        onCreate={(name: string) => onCreateTodoList(name)}
        open={createListModalOpen}
      />
      <div className="flex flex-col gap-2">
        {todoLists.map((todoList: TodoList) => (
          <SidebarListItem
            count={todoList.todos.length}
            onClick={() => onSelectTodoList(todoList)}
            name={todoList.name}
          />
        ))}
      </div>
    </div>
  );
}

type SidebarListItemProps = {
  count: number;
  onClick: () => void;
  name: string;
};

function SidebarListItem(props: SidebarListItemProps) {
  const { count, onClick, name } = props;

  return (
    <div
      className="cursor-pointer hover:bg-slate-300 mx-2 rounded-md"
      onClick={() => onClick()}
    >
      <div className="flex justify-between px-2 py-1">
        <div>{name}</div>
        <div className="my-auto text-sm">{count}</div>
      </div>
    </div>
  );
}
