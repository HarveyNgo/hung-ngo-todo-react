// import React, { useState } from "react";
// import "./App.css";
// import { useTodoStore } from "./store";
// import { v4 as uuidv4 } from "uuid";
// import TodoList from "./Todo/TodoList";
// import Footer from "./Todo/Footer";
// import { FilterType } from "./Type";

// function App() {
//   const [newTitle, setNewTitle] = useState("");
//   const {
//     addTodo,
//     items,
//     clearCompleted,
//     toggleTodo,
//     removeTodo,
//     setFilterType,
//     currentFilterType,
//   } = useTodoStore();

//   const addTodoHandler = () => {
//     if (newTitle.trim() !== "") {
//       addTodo({ id: uuidv4(), title: newTitle, completed: false });
//       setNewTitle("");
//     }
//   };

//   const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key.toLowerCase() === "enter") {
//       addTodoHandler();
//     }
//   };
//   const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewTitle(e.currentTarget.value);
//   };

//   let visibleItems = [...items];
//   if (currentFilterType === FilterType.COMPLETED) {
//     visibleItems = visibleItems.filter((li) => li.completed);
//   } else if (currentFilterType === FilterType.ACTIVE) {
//     visibleItems = visibleItems.filter((li) => !li.completed);
//   }

//   return (
//     <div className="container">
//       <h1>TODOs</h1>

//       <div>
//         <input
//           value={newTitle}
//           className="todo-input"
//           type="text"
//           placeholder="what need to be done?"
//           onKeyDown={onKeyDownHandler}
//           onChange={onChangeHandler}
//         />
//         <TodoList
//           onRemove={removeTodo}
//           onToggle={toggleTodo}
//           visibleItems={visibleItems}
//         />
//         <Footer
//           currentFilterType={currentFilterType}
//           visibleItems={visibleItems}
//           onFilterTypeHandler={setFilterType}
//           clearCompleted={clearCompleted}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;
import ReactDOM from "react-dom";
import Footer from "./components/footer";
import Main from "./components/main";
import { useTodoStore } from "./store";
import { FilterType } from "./Type";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const {
    addTodo,
    items,
    clearCompleted,
    toggleTodo,
    removeTodo,
    setFilterType,
    currentFilterType,
  } = useTodoStore();

  const inputRef = useRef<HTMLInputElement>(null);

  console.log("hung items:", items);

  var activeTodoCount = items.reduce(function (accum, todo) {
    return todo.completed ? accum : accum + 1;
  }, 0);

  var completedTodoCount = items.length - activeTodoCount;

  const handleNewTodoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() !== "enter") {
      return;
    }

    e.preventDefault();

    if (inputRef) {
      var val = inputRef.current?.value.trim();
      if (val) {
        addTodo({ id: uuidv4(), title: val, completed: false, editing: false });
      }
    }
  };

  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <input
          ref={inputRef}
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={handleNewTodoKeyDown}
          autoFocus={true}
        />
      </header>
      <Main onToggle={toggleTodo} onDestroy={removeTodo} />
      <Footer
        activeTodoCount={activeTodoCount}
        completedTodoCount={completedTodoCount}
        currentFilterType={currentFilterType}
        onFilterTypeHandler={setFilterType}
        clearCompleted={clearCompleted}
      />
      {/* {main}
      {footer} */}
    </div>
  );
}
export default App;
