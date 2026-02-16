import { ColumnId, Task, TaskId } from "./types";

export type BoardAction =
  | { type: "ADD_TASK"; task: Task }
  | { type: "UPDATE_TASK"; id: TaskId; updates: Partial<Task> }
  | { type: "DELETE_TASK"; id: TaskId }
  | {
      type: "MOVE_TASK";
      from: ColumnId;
      to: ColumnId;
      sourceIndex: number;
      targetIndex: number;
    }
  | { type: "TICK" }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "HYDRATE"; payload: unknown };
