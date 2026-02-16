export type TaskId = string;

export type Task = {
  id: TaskId;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: 1 | 2 | 3; // 1: Low, 2: Medium, 3: High
  createdAt: number;
  updatedAt: number;
};

export type BoardState = {
  tasks: Record<TaskId, Task>;
  order: {
    todo: TaskId[];
    inProgress: TaskId[];
    done: TaskId[];
  };
  filters: {
    text: string;
    priority: number | null;
  };
  history: Omit<BoardState, "history" | "future">[];
  future: Omit<BoardState, "history" | "future">[];
};