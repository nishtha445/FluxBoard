import { BoardState } from "./types";

export const initialState: BoardState = {
  past: [],
  present: {
    tasks: {},
    order: {
      todo: [],
      inProgress: [],
      done: [],
    },
  },
  future: [],
};
