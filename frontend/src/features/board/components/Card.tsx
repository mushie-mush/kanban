import type { ICard } from '../types/Card';
import Label from './Label';

function Card({ data }: { data: ICard }) {
  return (
    <div className="kanban-card bg-white border border-gray-200 rounded-md p-4">
      <div className="kanban-card__header">
        <h3 className="font-semibold text-lg mb-2">{data.card_title}</h3>
      </div>
      <div className="kanban-card__body">
        <p className="text-sm text-gray-700 mb-4">{data.content}</p>
        <div className="kanban-card__labels">
          <Label />
        </div>
      </div>
    </div>
  );
}
export default Card;
