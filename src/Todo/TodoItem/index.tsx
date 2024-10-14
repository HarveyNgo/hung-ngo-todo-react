import { useState } from "react";
import { Todo } from "../../Type";
import "./TodoItem.css";

interface Prop {
  onRemove: (todo: Todo) => void;
  onToggle: (todo: Todo) => void;
  todo: Todo;
}
const TodoList: React.FC<Prop> = ({ todo, onRemove, onToggle }) => {
  const [showDelete, setShowDelete] = useState(false);
  return (
    <li onClick={() => setShowDelete(!showDelete)}>
      <input
        className="toggle"
        type="checkbox"
        onClick={() => onToggle(todo)}
      />
      <label>{todo.title}</label>
      {/* {showDelete && (
        <button className="destroy" onClick={() => onRemove(todo)}>
          delete
        </button>
      )} */}
      <button className="destroy" onClick={() => onRemove(todo)}>
        delete
      </button>
    </li>
  );
};

export default TodoList;
