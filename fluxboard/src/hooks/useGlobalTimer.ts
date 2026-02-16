import { useEffect, useRef } from "react";
import { Action } from "../state/types";

export function useGlobalTimer(dispatch: React.Dispatch<Action>) {
  const ref = useRef(dispatch);
  ref.current = dispatch;

  useEffect(() => {
    const id = setInterval(() => {
      ref.current({ type: "TICK" });
    }, 10000);
    return () => clearInterval(id);
  }, []);
}
