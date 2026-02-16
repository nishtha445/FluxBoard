import { useCallback } from "react";
import { BoardAction } from "../state/actions";

export const useUndoRedo = (
  dispatch: React.Dispatch<BoardAction>
) => ({
  undo: useCallback(() => dispatch({ type: "UNDO" }), [dispatch]),
  redo: useCallback(() => dispatch({ type: "REDO" }), [dispatch]),
});
