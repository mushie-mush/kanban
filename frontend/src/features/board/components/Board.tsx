import { Button } from '@radix-ui/themes';
import Column from './Column';
import { getBoard } from '../api/getBoard';
import { useEffect, useState } from 'react';
import type { IColumn } from '../types/Column';

function Board() {
  const [columns, setColumns] = useState<IColumn[]>([]);

  useEffect(() => {
    getBoard(1).then((data) => {
      console.log('Board Data:', data);
      setColumns(data.columns);
    });
  }, []);

  return (
    <div className="flex py-4 gap-4 overflow-x-auto">
      {columns.map((column) => (
        <Column key={column.column_id} data={column} />
      ))}
      <Button variant="outline" className="h-10 self-start mt-2">
        + Add Column
      </Button>
    </div>
  );
}
export default Board;
