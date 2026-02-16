export type ColumnId = "todo" | "inProgress" | "done";
export type TaskId = string;

export interface Task {
  id: TaskId;
  title: string;
  createdAt: number;
  updatedAt: number;
  timeSpent: number;
}

export interface BoardPresent {
  tasks: Record<TaskId, Task>;
  order: Record<ColumnId, TaskId[]>;
}

export interface BoardState {
  past: BoardPresent[];
  present: BoardPresent;
  future: BoardPresent[];
}

export type Action =
  | { type: "ADD_TASK"; payload: { task: Task; column: ColumnId } }
  | { type: "UPDATE_TASK"; payload: { id: TaskId; updates: Partial<Task> } }
  | { type: "DELETE_TASK"; payload: { id: TaskId } }
  | {
      type: "MOVE_TASK";
      payload: {
        from: ColumnId;
        to: ColumnId;
        fromIndex: number;
        toIndex: number;
      };
    }
  | { type: "TICK" }
  | { type: "UNDO" }
  | { type: "REDO" };
