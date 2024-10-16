import { useState } from "react";
import { useTodoStore } from "../store";
import { FilterType, Todo } from "../Type";
import TodoItem from "./todoItem";

interface Props {
  activeTodoCount: number;
  onToggle: (todo: Todo) => void;
  onDestroy: (todo: Todo) => void;
  onToggleAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Main: React.FC<Props> = ({
  activeTodoCount,
  onToggle,
  onDestroy,
  onToggleAll,
}) => {
  const { items, currentFilterType, saveTodo } = useTodoStore();
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const onEdit = (todo: Todo) => {
    setEditingTodoId(todo.id);
  };
  const onCancel = () => {
    setEditingTodoId(null);
  };

  const onSave = (todoToSave: Todo, text: string) => {
    saveTodo(todoToSave, text);
    setEditingTodoId(null);
  };

  var shownTodos = items.filter((todo) => {
    switch (currentFilterType) {
      case FilterType.ACTIVE:
        return !todo.completed;
      case FilterType.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  const renderItem = () => {
    return (
      <>
        {shownTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDestroy={onDestroy}
              onEdit={onEdit}
              editing={editingTodoId === todo.id}
              onSave={onSave}
              onCancel={onCancel}
            />
          );
        })}
      </>
    );
  };

  return items ? (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={onToggleAll}
        checked={activeTodoCount === 0}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">{renderItem()}</ul>
    </section>
  ) : (
    <></>
  );
};

export default Main;
