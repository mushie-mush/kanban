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
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router';
import { addBoard } from './boardSlice';
import { getCsrfToken } from '@/lib/csrf';

function CreateBoardModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const isOpen = searchParams.get('create-board') === 'open';

  function closeModal() {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('create-board');
    setSearchParams(newParams);
  }

  async function handleCreateBoard(e: React.FormEvent) {
    e.preventDefault();

    const csrfToken = await getCsrfToken();

    const response = await fetch('http://localhost:8000/api/boards/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({ name, description }),
    });
    const data = await response.json();

    if (!response.ok) {
      console.error('Failed to create board:', data);
      return;
    }

    dispatch(addBoard(data));
    closeModal();
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false}>
        <form onSubmit={handleCreateBoard} className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Create Board
            </DialogTitle>
            <DialogDescription>
              Fill in the details to create a new board.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="board-name">Name</Label>
              <Input
                id="board-name"
                name="board-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <Label htmlFor="board-description">Description</Label>
              <Input
                id="board-description"
                name="board-description"
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
export default CreateBoardModal;
