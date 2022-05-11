import { useState } from 'react';

import Button from './Button';
import Input from './Input';
import Modal from './Modal';

type CreateListModalProps = {
  onClose: () => void;
  onCreate: (name: string) => void;
  open: boolean;
};

export default function CreateListModal(props: CreateListModalProps) {
  const { onClose, onCreate, open } = props;

  const [listName, setListName] = useState('');

  function handleCreate(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    onCreate(listName);
    handleClose();
  }

  function handleClose(): void {
    setListName('');
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      title="Create a new todo list"
    >
      <form className="flex flex-col gap-2" onSubmit={(e) => handleCreate(e)}>
        <Input
          onChange={(v: string) => setListName(v)}
          placeholder="List name"
          value={listName}
        />
        <div className="flex flex-row justify-center gap-2">
          <Button expand onClick={() => handleClose()} text="Cancel" />
          <Button expand text="Create" type="submit" variant="primary" />
        </div>
      </form>
    </Modal>
  );
}
