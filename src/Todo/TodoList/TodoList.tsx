import { useTodoStore } from "../../store";
import { Todo } from "../../Type";
import TodoItem from "../TodoItem";
import "./TodoList.css";

interface Prop {
  onRemove: (todo: Todo) => void;
  onToggle: (todo: Todo) => void;
}
const TodoList: React.FC<Prop> = ({ onRemove, onToggle }) => {
  const { items } = useTodoStore();

  return (
    <ul className="todo-list">
      {items.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            onRemove={onRemove}
            onToggle={onToggle}
            todo={todo}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
