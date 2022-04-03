import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../feature/gameSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export { store };
