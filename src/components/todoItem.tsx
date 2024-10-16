import React, { useRef, useState } from "react";
import { Todo } from "../Type";
import classNames from "classnames";
import { ENTER_KEY, ESCAPE_KEY } from "../constants";

interface Props {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDestroy: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  editing: boolean;
  onCancel: () => void;
  onSave: (todoToSave: Todo, text: string) => void;
}

const TodoItem: React.FC<Props> = ({
  todo,
  onToggle,
  onDestroy,
  onEdit,
  editing,
  onCancel,
  onSave,
}) => {
  const todoItemRef = useRef<HTMLInputElement>(null);
  const [editText, setEditText] = useState("");

  const handleEdit = () => {
    onEdit(todo);
    setEditText(todo.title);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };
  const handleSubmit = () => {
    var val = editText.trim();
    if (val) {
      onSave(todo, val);
      setEditText(val);
    } else {
      onDestroy(todo);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code.toLowerCase() === ESCAPE_KEY) {
      setEditText(todo.title);
      onCancel();
    } else if (e.code.toLowerCase() === ENTER_KEY) {
      handleSubmit();
    }
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: editing,
      })}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
        />
        <label
          onDoubleClick={(e) => {
            handleEdit();
          }}
        >
          {todo.title}
        </label>
        <button className="destroy" onClick={() => onDestroy(todo)} />
      </div>
      <input
        className="edit"
        ref={todoItemRef}
        value={editText}
        onBlur={(e) => handleSubmit()}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
};

export default TodoItem;
