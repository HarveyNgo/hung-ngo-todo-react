import React, { useState } from "react";
import "./App.css";
import { useTodoStore } from "./store";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./Todo/TodoList";
import Footer from "./Todo/Footer";
import { FilterType } from "./Type";

function App() {
  const [newTitle, setNewTitle] = useState("");
  const {
    addTodo,
    items,
    clearCompleted,
    toggleTodo,
    removeTodo,
    setFilterType,
    currentFilterType,
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

  let visibleItems = [...items];
  if (currentFilterType === FilterType.COMPLETED) {
    visibleItems = visibleItems.filter((li) => li.completed);
  } else if (currentFilterType === FilterType.ACTIVE) {
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
          currentFilterType={currentFilterType}
          visibleItems={visibleItems}
          onFilterTypeHandler={setFilterType}
          clearCompleted={clearCompleted}
        />
      </div>
    </div>
  );
}

export default App;
