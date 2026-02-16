import { useEffect, useRef } from "react";
import { BoardState } from "../state/types";

export function useDebouncedLocalStorage(state: BoardState) {
  const ref = useRef<number>(0);

  useEffect(() => {
    clearTimeout(ref.current);
    ref.current = window.setTimeout(() => {
      try {
        localStorage.setItem("board", JSON.stringify(state.present));
      } catch {
        localStorage.removeItem("board");
      }
    }, 800);
  }, [state.present]);
}
