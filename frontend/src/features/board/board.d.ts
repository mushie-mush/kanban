interface IBoard {
  id: string;
  name: string;
  description: string;
  owner: string;
}

interface IColumn {
  id: string;
  title: string;
  description?: string;
  board: string;
}

interface ITask {
  id: string;
  title: string;
  description?: string;
  column: string;
}

export type { IBoard, IColumn, ITask };
