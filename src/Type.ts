export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export enum FilterType {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}
