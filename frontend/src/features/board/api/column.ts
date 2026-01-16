interface newColumnParams {
  boardId: number;
  columnTitle: string;
  order: number;
  createdBy: string;
}

export const createColumn = async ({
  boardId,
  columnTitle,
  order,
  createdBy,
}: newColumnParams) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/api/columns/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        board_id: boardId,
        column_title: columnTitle,
        order: order,
        created_by: createdBy,
        created_at: new Date().toISOString(),
      }),
    }
  );
  return response.json();
};

export const deleteColumn = async (columnId: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/api/columns/${columnId}/`,
    {
      method: 'DELETE',
    }
  );
  return response.ok;
};
