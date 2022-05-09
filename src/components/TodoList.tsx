import { TrashIcon } from '@heroicons/react/outline';

import { TodoList } from '../types/TodoList';
import Button from './Button';

type TodoListProps = {
  onDeleteTodoList: (uuid: string) => void;
  todoList: TodoList;
};

export default function TodoListComponent(props: TodoListProps) {
  const { onDeleteTodoList, todoList } = props;

  return (
    <div className="flex flex-col grow">
      <div className="flex flex-row px-4 py-2">
        <h1 className="grow text-center">{todoList.name}</h1>
        <Button
          icon={<TrashIcon />}
          onClick={() => onDeleteTodoList(todoList.id)}
        />
      </div>
    </div>
  );
}
