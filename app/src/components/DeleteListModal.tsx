import Button from './Button';
import Modal from './Modal';

type DeleteListModalProps = {
  onClose: () => void;
  onDelete: () => void;
  open: boolean;
};

export default function DeleteListModal(props: DeleteListModalProps) {
  const { onClose, onDelete, open } = props;

  function handleDelete(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    onDelete();
    onClose();
  }

  return (
    <Modal open={open} onClose={() => onClose()} title="Delete this list?">
      <form
        className="flex flex-row justify-center gap-2"
        onSubmit={(e) => handleDelete(e)}
      >
        <Button expand onClick={() => onClose()} text="Cancel" />
        <Button expand text="Delete" type="submit" variant="danger" />
      </form>
    </Modal>
  );
}
