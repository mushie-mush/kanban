import { Button } from '@/components/ui/button';
import Column from '@/features/board/components/Column';
import { loadColumns } from '@/features/board/components/columnSlice';
import type { RootState } from '@/store';
import { LucidePlus } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

const ColumnData = [
  {
    id: 'col1',
    title: 'To Do',
    description: 'Tasks to be completed',
    boardId: '1',
  },
  {
    id: 'col2',
    title: 'In Progress',
    description: 'Tasks currently being worked on',
    boardId: '1',
  },
  {
    id: 'col3',
    title: 'Done',
    description: 'Completed tasks',
    boardId: '1',
  },
  {
    id: 'col4',
    title: 'Backlog',
    description: 'Tasks that are not yet prioritized',
    boardId: '2',
  },
  {
    id: 'col5',
    title: 'Sprint',
    description: 'Tasks planned for the current sprint',
    boardId: '2',
  },
];

function Board() {
  const { boardId } = useParams();
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
          const data = ColumnData.filter(
            (column) => column.boardId === boardId,
          );
          dispatch(loadColumns({ boardId, columns: data }));
        } catch (error) {
          console.error('Error fetching columns:', error);
        }
      }

      fetchColumns();
    }
  }, [boardId, board, boardColumns.length, dispatch]);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{board?.name}</h1>
          <p className="text-muted-foreground mt-2">
            {board?.description || 'No description provided.'}
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        {boardColumns.map((column, index) => (
          <Column key={index} {...column} />
        ))}
        <Button variant="outline" className="">
          <LucidePlus />
        </Button>
      </div>
    </div>
  );
}
export default Board;
