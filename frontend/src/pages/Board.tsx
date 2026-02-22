import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

function Board() {
  const { boardId } = useParams();

  const boards = useSelector((state: RootState) => state.boards.boards);
  const board = boards.find((board) => board.id == boardId);

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
    </div>
  );
}
export default Board;
