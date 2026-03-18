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
import type { IColumn } from '../board';
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

const TaskData = [
  {
    id: 'task1',
    title: 'Example Task 1',
    description: 'This is an example task',
    columnId: 'col1',
  },
  {
    id: 'task2',
    title: 'Example Task 2',
    description: 'This is another example task',
    columnId: 'col1',
  },
];

function Column({ id, title, description }: IColumn) {
  const { boardId } = useParams();
  const tasks = useSelector(
    (state: RootState) => state.tasks.tasksByColumnID[id] || [],
  );
  const columnTasks = tasks.filter((task) => task.column === id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (columnTasks.length === 0) {
      async function fetchTasks() {
        try {
          const data = TaskData.filter((task) => task.columnId === id);
          dispatch(loadTasks({ columnId: id, tasks: data }));
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      }

      fetchTasks();
    }
  }, [dispatch, id, columnTasks.length]);

  async function handleDeleteColumn() {
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
      console.error('Failed to delete column');

      return;
    }

    dispatch(deleteColumn({ boardId: boardId!, columnId: id }));
  }

  return (
    <Card className="w-85" size="sm">
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
        <Button className="w-full">
          <LucidePlus className="mr-2" />
          <span>Add Task</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
export default Column;
