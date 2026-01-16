import { getBoards } from '@/features/board/api/board';
import { useEffect, useState } from 'react';

function Sidebar() {
  const [boards, setBoards] = useState<
    Array<{ board_id: number; board_name: string }>
  >([]);

  useEffect(() => {
    getBoards().then((data) => {
      setBoards(data);
    });
  }, []);

  return (
    <div className="w-64 p-6 border-r h-screen flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Board List</h2>
      <ul>
        {boards.map((board) => (
          <li key={board.board_id} className="mb-2">
            {board.board_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Sidebar;
