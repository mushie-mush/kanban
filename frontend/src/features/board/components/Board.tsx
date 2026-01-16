import KanbanColumn from './KanbanColumn';
import { Button } from '@/components/ui/button';
import type { IBoard } from '../types/board';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { createColumn } from '../api/column';

function Board({ data }: { data: IBoard }) {
  return (
    <div className="flex py-4 gap-4 overflow-x-auto">
      {data?.columns.map((column) => (
        <KanbanColumn key={column.column_id} data={column} />
      ))}
      <NewColumnDialog boardId={data.board_id} order={data.columns.length} />
    </div>
  );
}

function NewColumnDialog({
  boardId,
  order,
}: {
  boardId: number;
  order: number;
}) {
  const [columnTitle, setColumnTitle] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const requestBody = {
      boardId: boardId,
      columnTitle,
      order: order,
      createdBy: 'dev',
    };

    const response = await createColumn(requestBody);
    console.log('Column created:', response);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+ Add Column</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Add New Column</DialogTitle>
            <DialogDescription>
              Enter the name for the new column you want to add to the board.
            </DialogDescription>
          </DialogHeader>
          <Field>
            <FieldLabel htmlFor="column-name">Column Name</FieldLabel>
            <Input
              id="column-name"
              placeholder="e.g. To Do"
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
            />
          </Field>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Column</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Board;
