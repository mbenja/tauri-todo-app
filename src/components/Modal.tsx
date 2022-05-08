import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
};

export default function Modal(props: ModalProps) {
  const { children, onClose, open } = props;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="bg-opacity-50 bg-slate-50 flex fixed justify-center inset-0 items-center"
          onClick={() => onClose()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="bg-slate-200 p-4 rounded-md shadow-lg w-1/3"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100vh' }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100vh' }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
