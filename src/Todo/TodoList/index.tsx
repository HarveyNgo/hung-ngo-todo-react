import { Todo } from "../../Type";
import TodoItem from "../TodoItem";
import "./style.css";

interface Prop {
  onRemove: (todo: Todo) => void;
  onToggle: (todo: Todo) => void;
  visibleItems: Todo[];
}
const TodoList: React.FC<Prop> = ({ onRemove, onToggle, visibleItems }) => {
  return (
    <div className="todo-list">
      {visibleItems.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            onRemove={onRemove}
            onToggle={onToggle}
            todo={todo}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
