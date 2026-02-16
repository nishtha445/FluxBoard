import { useMemo } from "react";
import { Task, TaskId } from "../state/types";

export function useTaskFilters(
  tasks: Record<TaskId, Task>,
  ids: TaskId[],
  search: string
) {
  return useMemo(
    () =>
      ids.filter(id =>
        tasks[id].title.toLowerCase().includes(search.toLowerCase())
      ),
    [tasks, ids, search]
  );
}
