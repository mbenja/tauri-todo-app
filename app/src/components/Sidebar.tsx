import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';

import Button from './Button';
import CreateListModal from './CreateListModal';
import { TodoList } from '../types/TodoList';
import { useStore } from '../store/store';

export default function Sidebar() {
  const todoLists = useStore((state) => state.todoLists);
  const selectedTodoList = useStore((state) => state.selectedTodoList);
  const onCreateTodoList = useStore((state) => state.createTodoList);
  const onSelectTodoList = useStore((state) => state.selectTodoList);

  const [createListModalOpen, setCreateListModalOpen] = useState(false);

  return (
    <div className="bg-gray-50 border-gray-100 border-r flex flex-col max-w-lg min-w-[200px] py-2 w-1/4">
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
      <div className="flex flex-col gap-2 overflow-auto">
        {todoLists.map((todoList: TodoList) => (
          <SidebarListItem
            key={`sidebar-item-${todoList.id}`}
            count={todoList.todos.length}
            onClick={() => onSelectTodoList(todoList)}
            name={todoList.name}
            selected={selectedTodoList === todoList}
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
