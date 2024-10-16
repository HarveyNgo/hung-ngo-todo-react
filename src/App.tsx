import Footer from "./components/footer";
import Main from "./components/main";
import { useTodoStore } from "./store";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { ENTER_KEY } from "./constants";

function App() {
  const {
    addTodo,
    items,
    clearCompleted,
    toggleTodo,
    removeTodo,
    setFilterType,
    currentFilterType,
    toggleAll,
  } = useTodoStore();

  const inputRef = useRef<HTMLInputElement>(null);

  var activeTodoCount = items.reduce(function (accum, todo) {
    return todo.completed ? accum : accum + 1;
  }, 0);

  var completedTodoCount = items.length - activeTodoCount;

  const handleNewTodoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() !== ENTER_KEY) {
      return;
    }

    e.preventDefault();

    if (inputRef) {
      var val = inputRef.current?.value.trim();
      if (val) {
        addTodo({ id: uuidv4(), title: val, completed: false });
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    }
  };

  const onToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleAll(e.target.checked);
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
      <Main
        activeTodoCount={activeTodoCount}
        onToggle={toggleTodo}
        onDestroy={removeTodo}
        onToggleAll={onToggleAll}
      />
      {(activeTodoCount > 0 || completedTodoCount > 0) && (
        <Footer
          activeTodoCount={activeTodoCount}
          completedTodoCount={completedTodoCount}
          currentFilterType={currentFilterType}
          onFilterTypeHandler={setFilterType}
          clearCompleted={clearCompleted}
        />
      )}
    </div>
  );
}
export default App;
