import { Todo } from "../../Type";
import "./style.css";

interface Prop {
  onRemove: (todo: Todo) => void;
  onToggle: (todo: Todo) => void;
  todo: Todo;
}
const TodoList: React.FC<Prop> = ({ todo, onRemove, onToggle }) => {
  const renderCss = () =>
    todo.completed ? "item-container completed" : "item-container";

  return (
    <div className={renderCss()}>
      <div className="item-title-container">
        <input
          className="toggle"
          type="checkbox"
          onClick={() => onToggle(todo)}
        />
        <label className="item-title">{todo.title}</label>
      </div>

      <button className="destroy" onClick={() => onRemove(todo)}>
        delete
      </button>
    </div>
  );
};

export default TodoList;
