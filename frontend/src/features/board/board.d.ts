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
  boardId: string;
}

interface ITask {
  id: string;
  title: string;
  description?: string;
  columnId: string;
}

export type { IBoard, IColumn, ITask };
