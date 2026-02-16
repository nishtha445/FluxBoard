import { useRef, useCallback } from "react";
import { ColumnId, TaskId } from "../state/types";
import { BoardAction } from "../state/actions";

export function useBoardDnD(
  dispatch: React.Dispatch<BoardAction>,
  masterIds: TaskId[],
  visibleIds: TaskId[]
) {
  const dragRef = useRef<{ id: TaskId; from: ColumnId } | null>(null);

  const onDragStart = useCallback((id: TaskId, from: ColumnId) => {
    dragRef.current = { id, from };
  }, []);

  const onDrop = useCallback(
    (to: ColumnId, visibleIndex: number) => {
      if (!dragRef.current) return;
      const targetId = visibleIds[visibleIndex];
      const targetIndex = targetId
        ? masterIds.indexOf(targetId)
        : masterIds.length;

      dispatch({
        type: "MOVE_TASK",
        from: dragRef.current.from,
        to,
        sourceIndex: masterIds.indexOf(dragRef.current.id),
        targetIndex,
      });

      dragRef.current = null;
    },
    [dispatch, masterIds, visibleIds]
  );

  return { onDragStart, onDrop };
}
