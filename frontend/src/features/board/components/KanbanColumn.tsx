import Card from './KanbanCard';
import type { IColumn } from '../types/Column';
import type { ICard } from '../types/Card';
import { Button } from '@/components/ui/button';
import { LucideEllipsis } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { deleteColumn } from '../api/column';

function KanbanColumn({ data }: { data: IColumn }) {
  async function handleDelete(columnId: number) {
    const response = await deleteColumn(columnId);

    if (response) {
      toast.success('Column deleted successfully');
    }
  }

  return (
    <div className="w-[320px] flex flex-col self-start bg-secondary rounded-xl p-4">
      <div className="column-title flex items-center mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {data.column_title}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="ml-auto">
              <LucideEllipsis size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>Edit Column</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(data.column_id)}>
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="column-body flex flex-col gap-4">
        {data.cards.map((card: ICard) => (
          <Card key={card.card_id} data={card} />
        ))}
        <Button variant="ghost">+ Add new card</Button>
      </div>
    </div>
  );
}
export default KanbanColumn;
