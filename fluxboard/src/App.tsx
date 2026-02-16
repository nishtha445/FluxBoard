import { useReducer, useState, useEffect } from "react";
import { boardReducer } from "./state/boardReducer";
import { initialState } from "./state/initialState";
import { Board } from "./components/Board";
import { Column } from "./components/Column";
import { TaskCard } from "./components/TaskCard";
import { useGlobalTimer } from "./hooks/useGlobalTimer";
import { useTaskOperations } from "./hooks/useTaskOperations";

export default function App() {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const [title, setTitle] = useState("");

  useGlobalTimer(dispatch);

  const { addTask, updateTask, deleteTask, moveTask } =
    useTaskOperations(dispatch);

  useEffect(() => {
    if (!state.present.order.todo.length) {
      addTask("My first task");
    }
  }, []);

  return (
    <>
      <div
  style={{
    display: "flex",
    gap: 8,
    padding: 16,
    alignItems: "center",
  }}
>
  <input
    value={title}
    onChange={e => setTitle(e.target.value)}
    placeholder="New task…"
  />
  <button
    onClick={() => {
      if (!title.trim()) return;
      addTask(title);
      setTitle("");
    }}
  >
    Add Task
  </button>

  <button className="secondary" onClick={() => dispatch({ type: "UNDO" })}>
    Undo
  </button>
  <button className="secondary" onClick={() => dispatch({ type: "REDO" })}>
    Redo
  </button>
</div>


      <Board>
        {(["todo", "inProgress", "done"] as const).map(col => (
          <Column key={col} title={col}>
            {state.present.order[col].map((id, index) => (
              <TaskCard
                key={id}
                task={state.present.tasks[id]}
                onDelete={() => deleteTask(id)}
                onUpdate={(newTitle: string) =>
                  updateTask(id, { title: newTitle })
                }
                
                onMovePrev={
                  col === "todo"
                    ? undefined
                    : () =>
                        moveTask(
                          col,
                          col === "done" ? "inProgress" : "todo",
                          index,
                          0
                        )
                }
                onMoveNext={
                  col === "done"
                    ? undefined
                    : () =>
                        moveTask(
                          col,
                          col === "todo" ? "inProgress" : "done",
                          index,
                          0
                        )
                }
              />
            ))}
          </Column>
        ))}
      </Board>
    </>
  );
}
