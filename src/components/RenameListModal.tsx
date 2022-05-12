import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';

type RenameListModalProps = {
  onClose: () => void;
  onRename: (newName: string) => void;
  open: boolean;
};

export default function RenameListModal(props: RenameListModalProps) {
  const { onClose, onRename, open } = props;

  const [newName, setNewName] = useState('');

  function handleRename(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (newName.length > 0) {
      onRename(newName);
      handleClose();
    }
  }

  function handleClose(): void {
    setNewName('');
    onClose();
  }

  return (
    <Modal open={open} onClose={() => handleClose()} title="Rename this list?">
      <form className="flex flex-col gap-2" onSubmit={(e) => handleRename(e)}>
        <Input
          onChange={(v: string) => setNewName(v)}
          placeholder="List name"
          value={newName}
        />
        <div className="flex flex-row gap-2">
          <Button expand onClick={() => handleClose()} text="Cancel" />
          <Button expand text="Rename" type="submit" variant="primary" />
        </div>
      </form>
    </Modal>
  );
}
