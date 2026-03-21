import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { getCsrfToken } from '@/lib/csrf';
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { addTask } from './taskSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { boardId } = useParams();
  const dispatch = useDispatch();

  const isOpen = searchParams.get('create-task') === 'open';
  const columnId = searchParams.get('column');

  function closeModal() {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('create-task');
    newParams.delete('column');
    setSearchParams(newParams);

    setTitle('');
    setDescription('');
  }

  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault();

    const csrfToken = await getCsrfToken();

    const response = await fetch(
      `http://localhost:8000/api/boards/${boardId}/columns/${columnId}/tasks/`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ title, description }),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.error || 'Failed to create task');
      return;
    }

    dispatch(
      addTask({
        columnId,
        task: data,
      }),
    );
    toast.success('Task created successfully');

    closeModal();
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false}>
        <form onSubmit={handleCreateTask} className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new task.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="task-name">Title</FieldLabel>
              <Input
                id="task-name"
                name="task-name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="task-description">Description</FieldLabel>
              <Input
                id="task-description"
                name="task-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Create</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default TaskForm;
