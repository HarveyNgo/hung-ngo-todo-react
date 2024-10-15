import React, { useState } from "react";
import "./App.css";
import { useTodoStore, ViewType } from "./store";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./Todo/TodoList";
import Footer from "./Todo/Footer";

function App() {
  const [newTitle, setNewTitle] = useState("");
  const {
    addTodo,
    items,
    clearCompleted,
    toggleTodo,
    removeTodo,
    setViewType,
    currentViewType,
  } = useTodoStore();

  const addTodoHandler = () => {
    if (newTitle.trim() !== "") {
      addTodo({ id: uuidv4(), title: newTitle, completed: false });
      setNewTitle("");
    }
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === "enter") {
      addTodoHandler();
    }
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const onViewTypeHandler = (viewType: ViewType) => {
    setViewType(viewType);
  };

  let visibleItems = [...items];
  if (currentViewType === ViewType.COMPLETED) {
    visibleItems = visibleItems.filter((li) => li.completed);
  } else if (currentViewType === ViewType.ACTIVE) {
    visibleItems = visibleItems.filter((li) => !li.completed);
  }

  return (
    <div className="container">
      <h1>TODOs</h1>

      <div>
        <input
          value={newTitle}
          className="todo-input"
          type="text"
          placeholder="what need to be done?"
          onKeyDown={onKeyDownHandler}
          onChange={onChangeHandler}
        />
        <TodoList
          onRemove={removeTodo}
          onToggle={toggleTodo}
          visibleItems={visibleItems}
        />
        <Footer
          currentViewType={currentViewType}
          visibleItems={visibleItems}
          onViewTypeHandler={onViewTypeHandler}
          clearCompleted={clearCompleted}
        />
      </div>
    </div>
  );
}

export default App;
