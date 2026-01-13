import { Button } from '@radix-ui/themes';
import Column from './Column';

function Board() {
  return (
    <div className="flex py-4 gap-4 overflow-x-auto">
      <Column />
      <Column />
      <Column />
      <Button variant="outline" className="h-10 self-start mt-2">
        + Add Column
      </Button>
    </div>
  );
}
export default Board;
