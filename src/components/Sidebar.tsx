import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';

import Button from './Button';
import CreateListModal from './CreateListModal';

export default function Sidebar() {
  const [createListModalOpen, setCreateListModalOpen] = useState(false);

  return (
    <div className="bg-slate-200 flex flex-col overflow-auto px-4 py-2 w-1/4">
      <div className="flex flex-row justify-between">
        <h2 className="flex self-end">Lists</h2>
        <Button
          icon={<PlusIcon />}
          onClick={() => setCreateListModalOpen(true)}
        />
      </div>
      <CreateListModal
        onClose={() => setCreateListModalOpen(false)}
        open={createListModalOpen}
      />
    </div>
  );
}
