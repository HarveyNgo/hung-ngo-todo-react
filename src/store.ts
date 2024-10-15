import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { FilterType, Todo } from "./Type";

interface TodoState {
  items: Todo[];
  currentFilterType: FilterType;
  addTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
  clearCompleted: () => void;
  toggleTodo: (todo: Todo) => void;
  setFilterType: (view: FilterType) => void;
}

export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        currentFilterType: FilterType.ALL,
        addTodo: (todo) => set((state) => ({ items: [...state.items, todo] })),
        removeTodo: (todo) =>
          set((state) => ({
            items: state.items.filter((t) => t.id !== todo.id),
          })),
        clearCompleted: () =>
          set((state) => ({
            items: state.items.filter((t) => !t.completed),
          })),
        toggleTodo: (todo) =>
          set((state) => ({
            items: state.items.map((t) =>
              t.id === todo.id ? { ...t, completed: !t.completed } : t
            ),
          })),
        setFilterType: (v) => set(() => ({ currentFilterType: v })),
      }),
      {
        name: "todo-react-app",
      }
    )
  )
);
