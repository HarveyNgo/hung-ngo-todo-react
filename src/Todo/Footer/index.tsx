import { Todo, FilterType } from "../../Type";
import "./style.css";

interface Prop {
  currentFilterType: FilterType;
  visibleItems: Todo[];
  onFilterTypeHandler: (filterType: FilterType) => void;
  clearCompleted: () => void;
}

const Footer: React.FC<Prop> = ({
  currentFilterType,
  visibleItems,
  onFilterTypeHandler,
  clearCompleted,
}) => {
  return (
    <div className="footer">
      <span className="todo-count">{visibleItems.length} items left!</span>
      <div className="filters">
        <button
          className={currentFilterType === FilterType.ALL ? "selected" : ""}
          onClick={() => {
            onFilterTypeHandler(FilterType.ALL);
          }}
        >
          All
        </button>
        <button
          className={currentFilterType === FilterType.ACTIVE ? "selected" : ""}
          onClick={() => {
            onFilterTypeHandler(FilterType.ACTIVE);
          }}
        >
          Active
        </button>
        <button
          className={
            currentFilterType === FilterType.COMPLETED ? "selected" : ""
          }
          onClick={() => {
            onFilterTypeHandler(FilterType.COMPLETED);
          }}
        >
          Completed
        </button>
      </div>
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </div>
  );
};

export default Footer;
