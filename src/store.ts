import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Todo } from "./Type";

export enum ViewType {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}
interface TodoState {
  items: Todo[];
  currentViewType: ViewType;
  addTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
  clearCompleted: () => void;
  toggleTodo: (todo: Todo) => void;
  setViewType: (view: ViewType) => void;
}

export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        currentViewType: ViewType.ALL,
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
        setViewType: (v) => set(() => ({ currentViewType: v })),
      }),
      {
        name: "todo-react-app",
      }
    )
  )
);
