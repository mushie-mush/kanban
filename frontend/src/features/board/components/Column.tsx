import { Button, Heading } from '@radix-ui/themes';
import Card from './Card';
import type { IColumn } from '../types/Column';
import type { ICard } from '../types/Card';

function Column({ data }: { data: IColumn }) {
  return (
    <div className="w-[320px] flex flex-col bg-slate-100 rounded-md p-4">
      <div className="column-title mb-4">
        <Heading as="h2" size="4">
          {data.column_title}
        </Heading>
      </div>
      <div className="column-body flex flex-col gap-4">
        {data.cards.map((card: ICard) => (
          <Card key={card.card_id} data={card} />
        ))}
        <Button className="h-10 self-start mt-2">+ Add Card</Button>
      </div>
    </div>
  );
}
export default Column;
