import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import type { ITaskPayload } from './CreateTask';

interface ITaskFormProps {
  formId: string;
  onSubmit: (payload: ITaskPayload) => void;
  initialState?: {
    id?: number;
    title?: string;
    description?: string;
    column?: number;
    board?: number;
  };
}

function TaskForm({ formId, onSubmit, initialState }: ITaskFormProps) {
  const [title, setTitle] = useState(initialState?.title || '');
  const [description, setDescription] = useState(
    initialState?.description || '',
  );

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      title,
      description,
      board: initialState?.board || 0,
      column: initialState?.column || 0,
    });

    setTitle('');
    setDescription('');
  }

  return (
    <form
      id={formId}
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-6"
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="task-name">Title</FieldLabel>
          <Input
            id="task-name"
            name="task-name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off"
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
            autoComplete="off"
          />
        </Field>
      </FieldGroup>
    </form>
  );
}
export default TaskForm;
