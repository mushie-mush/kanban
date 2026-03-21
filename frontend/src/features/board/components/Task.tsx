import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { ITask } from '../board';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { getCsrfToken } from '@/lib/csrf';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { deleteTask } from './taskSlice';
import { toast } from 'sonner';

function Task({ id, title, description, column }: ITask) {
  const dispatch = useDispatch();
  const { boardId } = useParams();

  async function handleDeleteTask() {
    try {
      const csrfToken = await getCsrfToken();

      const response = await fetch(
        `http://localhost:8000/api/boards/${boardId}/columns/${column}/tasks/${id}/`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'X-CSRFToken': csrfToken,
          },
        },
      );

      if (!response.ok) {
        toast.error('Failed to delete task');
        return;
      }

      dispatch(deleteTask({ columnId: column!, taskId: id }));
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    }
  }
  return (
    <Card size="sm" className="rounded-sm">
      <CardHeader>
        <CardTitle>
          <span className="text-lg font-semibold">{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical size={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Task</DropdownMenuLabel>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleDeleteTask}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
export default Task;
