import React, { useState } from "react";
import "./App.css";
import { useTodoStore } from "./store";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./Todo/TodoList/TodoList";
import { Todo } from "./Type";

function App() {
  const [newTitle, setNewTitle] = useState("");
  const { addTodo, items, clearCompleted, toggleTodo, removeTodo } =
    useTodoStore();

  console.log("hung items:", items);
  const addTodoHandler = () => {
    if (newTitle.trim() !== "") {
      addTodo({ id: uuidv4(), title: newTitle, completed: false });
    }
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("hung e:", e);
    if (e.key.toLowerCase() === "enter") {
      addTodoHandler();
    }
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  return (
    <div className="container">
      <h1>TODO List</h1>

      <div>
        <input
          className="todo-input"
          type="text"
          placeholder="what need to be done?"
          onKeyDown={onKeyDownHandler}
          onChange={onChangeHandler}
        />
        <TodoList onRemove={removeTodo} onToggle={toggleTodo} />
        <div className="footer">
          <span className="todo-count">2 items left!</span>
          <div className="filters" data-testid="footer-navigation">
            <button className="all">All</button>
            <button className="active">Active</button>
            <button className="completed">Completed</button>
          </div>
          <button className="clear-completed" onClick={clearCompleted}>
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
