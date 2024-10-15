import classNames from "classnames";
import { FilterType } from "../Type";

interface Props {
  activeTodoCount: number;
  completedTodoCount: number;
  currentFilterType: FilterType;
  onFilterTypeHandler: (filterType: FilterType) => void;
  clearCompleted: () => void;
}

const Footer: React.FC<Props> = ({
  activeTodoCount,
  completedTodoCount,
  currentFilterType,
  onFilterTypeHandler,
  clearCompleted,
}) => {
  var clearButton = null;

  if (completedTodoCount > 0) {
    clearButton = (
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    );
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeTodoCount}</strong> items left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: currentFilterType === FilterType.ALL,
            })}
            onClick={() => onFilterTypeHandler(FilterType.ALL)}
          >
            All
          </a>
        </li>{" "}
        <li>
          <a
            href="#/"
            className={classNames({
              selected: currentFilterType === FilterType.ACTIVE,
            })}
            onClick={() => onFilterTypeHandler(FilterType.ACTIVE)}
          >
            Active
          </a>
        </li>{" "}
        <li>
          <a
            href="#/"
            className={classNames({
              selected: currentFilterType === FilterType.COMPLETED,
            })}
            onClick={() => onFilterTypeHandler(FilterType.COMPLETED)}
          >
            Completed
          </a>
        </li>
      </ul>
      {clearButton}
    </footer>
  );
};

export default Footer;
