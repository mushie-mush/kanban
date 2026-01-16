export interface IBoard {
  board_id: number;
  board_name: string;
  owner: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  is_archived: boolean;
  visibility: 'private' | 'public';
  columns: IColumn[];
}
