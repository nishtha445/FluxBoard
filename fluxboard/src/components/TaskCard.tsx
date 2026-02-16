import React, { useState } from "react";
import { Task } from "../state/types";

export const TaskCard = React.memo(
  ({
    task,
    onDelete,
    onUpdate,
    onMovePrev,
    onMoveNext,
  }: {
    task: Task;
    onDelete: () => void;
    onUpdate: (title: string) => void;
    onMovePrev?: () => void;
    onMoveNext?: () => void;
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(task.title);

    return (
      <div
        style={{
          background: "#f9fafb",
          padding: 12,
          marginBottom: 10,
          borderRadius: 10,
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        {isEditing ? (
          <input
            autoFocus
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && value.trim()) {
                onUpdate(value.trim());
                setIsEditing(false);
              }
              if (e.key === "Escape") {
                setValue(task.title);
                setIsEditing(false);
              }
            }}
            style={{ width: "100%" }}
          />
        ) : (
          <div style={{ fontWeight: 600 }}>{task.title}</div>
        )}

        <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>
          Modified {task.timeSpent}s ago
        </div>

        <div
          style={{
            display: "flex",
            gap: 6,
            marginTop: 10,
            flexWrap: "wrap",
          }}
        >
          {onMovePrev && (
            <button className="secondary" onClick={onMovePrev}>
              ←
            </button>
          )}
          {onMoveNext && (
            <button className="secondary" onClick={onMoveNext}>
              →
            </button>
          )}

          {!isEditing ? (
            <button
              className="secondary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => {
                if (!value.trim()) return;
                onUpdate(value.trim());
                setIsEditing(false);
              }}
            >
              Save
            </button>
          )}

          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    );
  },
  (p, n) =>
    p.task.updatedAt === n.task.updatedAt &&
    p.task.title === n.task.title
);
