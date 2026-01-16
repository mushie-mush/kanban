import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Board from '../features/board/components/Board';
import Setting from '../features/board/components/Setting';
import type { IBoard } from '@/features/board/types/board';
import { useEffect, useReducer } from 'react';
import { getBoard } from '@/features/board/api/board';

type BoardAction = {
  type: 'SET_BOARD';
  payload: IBoard;
};

function boardReducer(state: IBoard | null, action: BoardAction) {
  switch (action.type) {
    case 'SET_BOARD':
      return action.payload;
    default:
      return state;
  }
}

function BoardPage() {
  const [board, setBoard] = useReducer(boardReducer, null);

  useEffect(() => {
    getBoard(1).then((data) => {
      setBoard({ type: 'SET_BOARD', payload: data });
    });
  }, []);

  console.log(board);

  return (
    <div className="py-4 px-12">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-balance mb-3">
          {board ? board.board_name : 'Loading...'}
        </h1>
        <p className="leading-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ea quia
          autem adipisci nostrum nihil fugit corporis.
        </p>
      </header>
      <Tabs defaultValue="board">
        <TabsList>
          <TabsTrigger value="board">Board View</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="board">
          {board && <Board data={board} />}
        </TabsContent>
        <TabsContent value="settings">
          <Setting />
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default BoardPage;
