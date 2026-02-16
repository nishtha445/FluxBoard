import { useMemo } from "react";

export function useVirtualList<T>(
  items: T[],
  scrollTop: number,
  height: number,
  itemHeight: number
) {
  return useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const count = Math.ceil(height / itemHeight) + 2;
    return {
      offset: start * itemHeight,
      visible: items.slice(start, start + count),
    };
  }, [items, scrollTop, height, itemHeight]);
}
