export interface ICard {
  card_id: number;
  card_title: string;
  content: string;
  column_id: number;
  order: number;
  created_at: string;
  created_by: string;
  updated_at: string;
  is_archived: boolean;
}
