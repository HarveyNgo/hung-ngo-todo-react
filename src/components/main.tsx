import { useTodoStore } from "../store";
import { Todo } from "../Type";
import TodoItem from "./todoItem";

interface Props {
  onToggle: (todo: Todo) => void;
  onDestroy: (todo: Todo) => void;
}

const Main: React.FC<Props> = ({ onToggle, onDestroy }) => {
  const { items } = useTodoStore();

  const renderItem = () => {
    return (
      <>
        {items.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDestroy={onDestroy}

              // onEdit={this.edit.bind(this, todo)}
              // editing={this.state.editing === todo.id}
              // onSave={this.save.bind(this, todo)}
              // onCancel={(e) => this.cancel()}
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
        onChange={(e) => {}}
        checked={false}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">{renderItem()}</ul>
    </section>
  ) : (
    <></>
  );
};

export default Main;
