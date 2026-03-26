import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import type { ICreateColumnProps } from './CreateColumn';
import { useParams } from 'react-router';

interface IColumnFormProps {
  formId: string;
  onSubmit: (payload: ICreateColumnProps) => void;
}

function ColumnForm({ formId, onSubmit }: IColumnFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { boardId } = useParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({ title, description, board: Number(boardId) });

    setTitle('');
    setDescription('');
  }

  return (
    <form id={formId} className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="column-name">Title</FieldLabel>
          <Input
            id="column-name"
            name="column-name"
            autoComplete="off"
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
            autoComplete="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
      </FieldGroup>
    </form>
  );
}
export default ColumnForm;
