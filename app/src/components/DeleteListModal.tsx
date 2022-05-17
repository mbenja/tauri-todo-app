import Button from './Button';
import Modal from './Modal';

type DeleteListModalProps = {
  onClose: () => void;
  onDelete: () => void;
  open: boolean;
};

export default function DeleteListModal(props: DeleteListModalProps) {
  const { onClose, onDelete, open } = props;

  function handleDelete(): void {
    onDelete();
    onClose();
  }

  return (
    <Modal open={open} onClose={() => onClose()} title="Delete this list?">
      <div className="flex flex-row justify-center gap-2">
        <Button expand onClick={() => onClose()} text="Cancel" />
        <Button
          expand
          onClick={() => handleDelete()}
          text="Delete"
          variant="danger"
        />
      </div>
    </Modal>
  );
}
