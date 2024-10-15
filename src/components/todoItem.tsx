import React, { useRef } from "react";
import { Todo } from "../Type";
import classNames from "classnames";

interface Props {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDestroy: (todo: Todo) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDestroy }) => {
  const todoItemRef = useRef<HTMLInputElement>(null);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: todo.editing,
      })}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
        />
        <label onDoubleClick={(e) => {}}>{todo.title}</label>
        <button className="destroy" onClick={() => onDestroy(todo)} />
      </div>
      <input
        className="edit"
        ref={todoItemRef}
        // value={this.state.editText}
        // onBlur={(e) => this.handleSubmit(e)}
        // onChange={(e) => this.handleChange(e)}
        // onKeyDown={(e) => this.handleKeyDown(e)}
      />
    </li>
  );
};

export default TodoItem;
