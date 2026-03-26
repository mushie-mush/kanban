import { Button } from '@/components/ui/button';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useDispatch } from 'react-redux';
import { addBoard } from './boardSlice';
import { getCsrfToken } from '@/lib/csrf';
import { toast } from 'sonner';
import Modal, { useModal } from '@/components/ui/Modal';
import BoardForm from './BoardForm';

export interface ICreateBoardProps {
  name: string;
  description: string;
}

function CreateBoard() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  async function handleCreateBoard(payload: ICreateBoardProps) {
    const csrfToken = await getCsrfToken();

    const response = await fetch('http://localhost:8000/api/boards/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.error || 'Failed to create board');
      return;
    }

    dispatch(addBoard(data));
    toast.success('Board created successfully');

    closeModal();
  }

  return (
    <Modal.Window name="create-board">
      <Modal.WindowHeader>
        <DialogTitle className="text-2xl font-bold">Create Board</DialogTitle>
        <DialogDescription>
          Fill in the details to create a new board.
        </DialogDescription>
      </Modal.WindowHeader>
      <BoardForm formId="create-board" onSubmit={handleCreateBoard} />
      <Modal.WindowFooter>
        <Button variant="outline" onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button type="submit" form="create-board">
          Create
        </Button>
      </Modal.WindowFooter>
    </Modal.Window>
  );
}
export default CreateBoard;
