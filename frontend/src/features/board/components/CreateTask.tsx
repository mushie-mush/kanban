import { Button } from '@/components/ui/button';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { getCsrfToken } from '@/lib/csrf';
import { addTask } from './taskSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import Modal, { useModal } from '@/components/ui/Modal';
import TaskForm from './TaskForm';
import { useParams } from 'react-router';

export interface ITaskPayload {
  title: string;
  description: string;
  board: number;
  column: number;
}

function CreateTask({ columnId }: { columnId: string | null }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { boardId } = useParams();

  async function handleCreateTask(payload: ITaskPayload) {
    const csrfToken = await getCsrfToken();

    const response = await fetch(
      `http://localhost:8000/api/boards/${payload.board}/columns/${payload.column}/tasks/`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(payload),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.error || 'Failed to create task');
      return;
    }

    dispatch(
      addTask({
        columnId: payload.column,
        task: data,
      }),
    );
    toast.success('Task created successfully');

    closeModal();
  }

  return (
    <Modal.Window name="create-task">
      <Modal.WindowHeader>
        <DialogTitle className="text-2xl font-bold">Create Task</DialogTitle>
        <DialogDescription>
          Fill in the details to create a new task.
        </DialogDescription>
      </Modal.WindowHeader>
      <TaskForm
        formId="create-task"
        onSubmit={handleCreateTask}
        initialState={{
          column: Number(columnId),
          board: Number(boardId),
        }}
      />
      <Modal.WindowFooter>
        <Button variant="outline" onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button type="submit" form="create-task">
          Create
        </Button>
      </Modal.WindowFooter>
    </Modal.Window>
  );
}
export default CreateTask;
