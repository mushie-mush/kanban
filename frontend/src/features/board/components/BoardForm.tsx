import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import type { ICreateBoardProps } from './CreateBoard';

interface IBoardFormProps {
  formId: string;
  onSubmit: (payload: ICreateBoardProps) => void;
}

function BoardForm({ formId, onSubmit }: IBoardFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({ name, description });

    setName('');
    setDescription('');
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="flex flex-col gap-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="board-name">Name</FieldLabel>
          <Input
            id="board-name"
            name="board-name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
      </FieldGroup>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="board-description">Description</FieldLabel>
          <Textarea
            id="board-description"
            name="board-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
      </FieldGroup>
    </form>
  );
}
export default BoardForm;
