import { Button } from '@/components/ui/button';
import Column from '@/features/board/components/Column';
import { loadColumns } from '@/features/board/components/columnSlice';
import CreateColumn from '@/features/board/components/CreateColumn';
import TaskForm from '@/features/board/components/TaskForm';
import { getCsrfToken } from '@/lib/csrf';
import type { RootState } from '@/store';
import { LucidePlus } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router';

function Board() {
  const { boardId } = useParams();
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const boards = useSelector((state: RootState) => state.boards.boards);
  const board = boards.find((board) => board.id == boardId);

  const columnsByBoardID = useSelector(
    (state: RootState) => state.columns.columnsByBoardID,
  );
  const boardColumns = columnsByBoardID[boardId!] || [];

  useEffect(() => {
    if (!board) return;

    if (boardColumns.length === 0) {
      async function fetchColumns() {
        try {
          const csrfToken = await getCsrfToken();

          const response = await fetch(
            `http://localhost:8000/api/boards/${boardId}/columns/`,
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
            console.error('Failed to fetch columns:', data);
            return;
          }

          console.log('Fetched columns:', data);

          dispatch(loadColumns({ boardId, columns: data }));
        } catch (error) {
          console.error('Error fetching columns:', error);
        }
      }

      fetchColumns();
    }
  }, [boardId, board, boardColumns.length, dispatch]);

  function openCreateColumnModal() {
    setSearchParams({ 'create-column': 'open' });
  }

  return (
    <div className="p-6 h-full flex flex-col max-w-full">
      <div className="flex flex-col mb-6">
        <div>
          <h1 className="text-3xl font-bold">{board?.name}</h1>
          <p className="text-muted-foreground mt-2">
            {board?.description || 'No description provided.'}
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-full overflow-x-auto bg-stone-100 rounded-2xl p-4">
        <div className="flex gap-4 flex-nowrap min-w-max">
          {boardColumns.map((column) => (
            <Column key={column.id} {...column} />
          ))}
          <Button
            variant="outline"
            className=""
            onClick={openCreateColumnModal}
          >
            <LucidePlus />
          </Button>
        </div>
      </div>

      <CreateColumn />
      <TaskForm />
    </div>
  );
}
export default Board;
