export const getBoard = async (boardId: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/api/boards/${boardId}/`
  );
  return response.json();
};
