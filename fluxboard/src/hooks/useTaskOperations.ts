import { useCallback } from "react";
import { Action, ColumnId, Task, TaskId } from "../state/types";

export function useTaskOperations(dispatch: React.Dispatch<Action>) {
  const addTask = useCallback(
    (title: string, column: ColumnId = "todo") => {
      const now = Date.now();
      const task: Task = {
        id: now.toString(),
        title,
        createdAt: now,
        updatedAt: now,
        timeSpent: 0,
      };
      dispatch({ type: "ADD_TASK", payload: { task, column } });
    },
    [dispatch]
  );

  const updateTask = useCallback(
    (id: TaskId, updates: Partial<Task>) => {
      dispatch({ type: "UPDATE_TASK", payload: { id, updates } });
    },
    [dispatch]
  );

  const deleteTask = useCallback(
    (id: TaskId) => {
      dispatch({ type: "DELETE_TASK", payload: { id } });
    },
    [dispatch]
  );

  const moveTask = useCallback(
    (from: ColumnId, to: ColumnId, fromIndex: number, toIndex: number) => {
      dispatch({
        type: "MOVE_TASK",
        payload: { from, to, fromIndex, toIndex },
      });
    },
    [dispatch]
  );

  return { addTask, updateTask, deleteTask, moveTask };
}
