function Card() {
  return (
    <div className="kanban-card bg-white border border-gray-200 rounded-md p-4">
      <div className="kanban-card__header">
        <h3 className="font-semibold text-lg mb-2">Card Title</h3>
      </div>
      <div className="kanban-card__body">
        <p className="text-sm text-gray-700 mb-4">
          This is a sample card description.
        </p>
        <div className="kanban-card__labels">
          <span className="kanban-card__label inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
            Label 1
          </span>
          <span className="kanban-card__label inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Label 2
          </span>
        </div>
      </div>
    </div>
  );
}
export default Card;
