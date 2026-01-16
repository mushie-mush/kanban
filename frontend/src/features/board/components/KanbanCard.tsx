import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ICard } from '../types/Card';

function KanbanCard({ data }: { data: ICard }) {
  return (
    <Card className="py-4 gap-2 rounded-lg">
      <CardHeader className="px-4">
        <CardTitle>{data.card_title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4">{data.content}</CardContent>
    </Card>
  );
}
export default KanbanCard;
