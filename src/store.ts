import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Todo } from "./Type";
// import type {} from '@redux-devtools/extension' // required for devtools typing

interface TodoState {
  items: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
  clearCompleted: () => void;
  toggleTodo: (todo: Todo) => void;
}

export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      (set) => ({
        items: [],
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
      }),
      {
        name: "todo-react-app",
      }
    )
  )
);
