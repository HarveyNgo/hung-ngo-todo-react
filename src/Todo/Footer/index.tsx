import { ViewType } from "../../store";
import { Todo } from "../../Type";
import "./style.css";

interface Prop {
  currentViewType: ViewType;
  visibleItems: Todo[];
  onViewTypeHandler: (viewType: ViewType) => void;
  clearCompleted: () => void;
}

const Footer: React.FC<Prop> = ({
  currentViewType,
  visibleItems,
  onViewTypeHandler,
  clearCompleted,
}) => {
  return (
    <div className="footer">
      <span className="todo-count">{visibleItems.length} items left!</span>
      <div className="filters">
        <button
          className={currentViewType === ViewType.ALL ? "selected" : ""}
          onClick={() => {
            onViewTypeHandler(ViewType.ALL);
          }}
        >
          All
        </button>
        <button
          className={currentViewType === ViewType.ACTIVE ? "selected" : ""}
          onClick={() => {
            onViewTypeHandler(ViewType.ACTIVE);
          }}
        >
          Active
        </button>
        <button
          className={currentViewType === ViewType.COMPLETED ? "selected" : ""}
          onClick={() => {
            onViewTypeHandler(ViewType.COMPLETED);
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
