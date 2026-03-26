import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/Modal';
import type { IColumn } from '@/features/board/board';
import Column from '@/features/board/components/Column';
import { loadColumns } from '@/features/board/components/columnSlice';
import CreateColumn from '@/features/board/components/CreateColumn';
import CreateTask from '@/features/board/components/CreateTask';
import { getCsrfToken } from '@/lib/csrf';
import type { RootState } from '@/store';
import { LucidePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

const EMPTY_COLUMNS: IColumn[] = [];

function Board() {
  const [creatingTaskColumnId, setCreatingTaskColumnId] = useState<
    string | null
  >(null);
  const { boardId } = useParams();
  const dispatch = useDispatch();

  const board = useSelector((state: RootState) =>
    state.boards.boards.find((board) => board.id == boardId),
  );

  const boardColumns = useSelector(
    (state: RootState) =>
      state.columns.columnsByBoardID[boardId!] || EMPTY_COLUMNS,
  );

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

          dispatch(loadColumns({ boardId, columns: data }));
        } catch (error) {
          console.error('Error fetching columns:', error);
        }
      }

      fetchColumns();
    }
  }, [boardId, board, boardColumns.length, dispatch]);

  function requestTaskCreation(columnId: string) {
    setCreatingTaskColumnId(columnId);
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
            <Column
              key={column.id}
              {...column}
              onCreateTask={() => requestTaskCreation(column.id)}
            />
          ))}
          <Modal.Open window="create-column">
            <Button variant="outline">
              <LucidePlus />
            </Button>
          </Modal.Open>
        </div>
      </div>

      <CreateColumn />
      <CreateTask columnId={creatingTaskColumnId} />
    </div>
  );
}
export default Board;
