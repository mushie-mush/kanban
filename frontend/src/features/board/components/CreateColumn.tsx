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
import { useParams, useSearchParams } from 'react-router';
import { addColumn } from './columnSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCsrfToken } from '@/lib/csrf';
import { toast } from 'sonner';

function CreateColumn() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { boardId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const isOpen = searchParams.get('create-column') === 'open';

  function closeModal() {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('create-column');
    setSearchParams(newParams);

    setTitle('');
    setDescription('');
  }

  async function handleCreateColumn(e: React.FormEvent) {
    e.preventDefault();

    const csrfToken = await getCsrfToken();

    const response = await fetch(
      `http://localhost:8000/api/boards/${boardId}/columns/`,
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
      toast.error(data.error || 'Failed to create column');
      return;
    }

    dispatch(
      addColumn({
        boardId,
        column: data,
      }),
    );

    toast.success('Column created successfully');
    closeModal();
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false}>
        <form onSubmit={handleCreateColumn} className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>Create Column</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new column.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="column-name">Title</FieldLabel>
              <Input
                id="column-name"
                name="column-name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="column-description">Description</FieldLabel>
              <Input
                id="column-description"
                name="column-description"
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
export default CreateColumn;
