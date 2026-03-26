import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EllipsisVertical, LucidePlus } from 'lucide-react';
import Task from './Task';
import type { IColumn, ITask } from '../board';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadTasks } from './taskSlice';
import { getCsrfToken } from '@/lib/csrf';
import { useParams } from 'react-router';
import { deleteColumn } from './columnSlice';
import { toast } from 'sonner';
import { useModal } from '@/components/ui/Modal';

const EMPTY_TASKS: ITask[] = [];

interface IColumnProps extends IColumn {
  onCreateTask: () => void;
}

function Column({ id, title, description, onCreateTask }: IColumnProps) {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { boardId } = useParams();
  const columnTasks = useSelector(
    (state: RootState) => state.tasks.tasksByColumnID[id] || EMPTY_TASKS,
  );

  useEffect(() => {
    if (columnTasks.length === 0) {
      async function fetchTasks() {
        try {
          const csrfToken = await getCsrfToken();

          const response = await fetch(
            `http://localhost:8000/api/boards/${boardId}/columns/${id}/tasks/`,
            {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
              },
            },
          );
          const data = await response.json();

          if (!response.ok) {
            toast.error('Failed to fetch tasks');
            return;
          }

          dispatch(loadTasks({ columnId: id, tasks: data }));
        } catch (error) {
          toast.error('Error fetching tasks');
          console.error('Error fetching tasks:', error);
        }
      }

      fetchTasks();
    }
  }, [dispatch, boardId, id, columnTasks.length]);

  async function handleDeleteColumn() {
    try {
      const csrfToken = await getCsrfToken();

      const response = await fetch(
        `http://localhost:8000/api/boards/${boardId}/columns/${id}/`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'X-CSRFToken': csrfToken,
          },
        },
      );

      if (!response.ok) {
        toast.error('Failed to delete column');
        return;
      }

      dispatch(deleteColumn({ boardId: boardId!, columnId: id }));
      toast.success('Column deleted successfully');
    } catch (error) {
      console.error('Error deleting column:', error);
      toast.error('Error deleting column');
    }
  }

  async function openTaskForm() {
    onCreateTask();
    openModal('create-task');
  }

  return (
    <Card className="w-85 self-start" size="sm">
      <CardHeader>
        <CardTitle>
          <span className="text-xl font-semibold">{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Column</DropdownMenuLabel>
                <DropdownMenuItem>Edit details</DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleDeleteColumn}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {columnTasks?.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={openTaskForm}>
          <LucidePlus className="mr-2" />
          <span>Add Task</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
export default Column;
