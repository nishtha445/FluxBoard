import { BoardState, Action } from "./types";

const MAX_HISTORY = 15;

function withHistory(state: BoardState, present: BoardState["present"]) {
  return {
    past: [...state.past, state.present].slice(-MAX_HISTORY),
    present,
    future: [],
  };
}

export function boardReducer(
  state: BoardState,
  action: Action
): BoardState {
  switch (action.type) {
    case "ADD_TASK": {
      const { task, column } = action.payload;
      return withHistory(state, {
        tasks: { ...state.present.tasks, [task.id]: task },
        order: {
          ...state.present.order,
          [column]: [...state.present.order[column], task.id],
        },
      });
    }

    case "UPDATE_TASK": {
      const { id, updates } = action.payload;
      const task = state.present.tasks[id];
      if (!task) return state;

      return withHistory(state, {
        ...state.present,
        tasks: {
          ...state.present.tasks,
          [id]: { ...task, ...updates, updatedAt: Date.now() },
        },
      });
    }

    case "DELETE_TASK": {
      const { id } = action.payload;
      const { [id]: _, ...rest } = state.present.tasks;

      return withHistory(state, {
        tasks: rest,
        order: {
          todo: state.present.order.todo.filter(t => t !== id),
          inProgress: state.present.order.inProgress.filter(t => t !== id),
          done: state.present.order.done.filter(t => t !== id),
        },
      });
    }

    case "MOVE_TASK": {
      const { from, to, fromIndex, toIndex } = action.payload;

      const fromList = [...state.present.order[from]];
      const [moved] = fromList.splice(fromIndex, 1);

      const toList = from === to ? fromList : [...state.present.order[to]];
      toList.splice(toIndex, 0, moved);

      return withHistory(state, {
        ...state.present,
        order: {
          ...state.present.order,
          [from]: from === to ? toList : fromList,
          [to]: toList,
        },
      });
    }

    case "TICK": {
      const now = Date.now();
      return {
        ...state,
        present: {
          ...state.present,
          tasks: Object.fromEntries(
            Object.entries(state.present.tasks).map(([id, task]) => [
              id,
              { ...task, timeSpent: Math.floor((now - task.updatedAt) / 1000) },
            ])
          ),
        },
      };
    }

    case "UNDO": {
      if (!state.past.length) return state;
      const prev = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1),
        present: prev,
        future: [state.present, ...state.future],
      };
    }

    case "REDO": {
      if (!state.future.length) return state;
      const next = state.future[0];
      return {
        past: [...state.past, state.present],
        present: next,
        future: state.future.slice(1),
      };
    }

    default:
      return state;
  }
}
