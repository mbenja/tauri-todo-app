import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';

import Button from './Button';
import CreateListModal from './CreateListModal';
import { TodoList } from '../types/TodoList';

type SidebarProps = {
  onCreateTodoList: (name: string) => void;
  onSelectTodoList: (todoList: TodoList) => void;
  selectedTodoList: TodoList | null;
  todoLists: TodoList[];
};

export default function Sidebar(props: SidebarProps) {
  const { onCreateTodoList, onSelectTodoList, selectedTodoList, todoLists } =
    props;

  const [createListModalOpen, setCreateListModalOpen] = useState(false);

  return (
    <div className="bg-gray-50 border-gray-100 border-r flex flex-col max-w-lg min-w-[200px] overflow-auto py-2 w-1/4">
      <div className="flex flex-row justify-between mb-2 px-4">
        <p className="flex font-medium self-end text-lg">Lists</p>
        <Button
          icon={<PlusIcon className="h-[22px] w-[16px]" />}
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
            selected={selectedTodoList?.id === todoList.id}
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
  selected: boolean;
};

function SidebarListItem(props: SidebarListItemProps) {
  const { count, onClick, name, selected } = props;

  const classes = `cursor-pointer mx-2 rounded-md ${
    selected ? 'bg-gray-200' : 'hover:bg-gray-100'
  }`;

  return (
    <div className={classes} onClick={() => onClick()}>
      <div className="flex justify-between px-2 py-1">
        <div>{name}</div>
        <div className="my-auto text-sm">{count}</div>
      </div>
    </div>
  );
}
