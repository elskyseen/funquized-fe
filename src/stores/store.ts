import { configureStore } from "@reduxjs/toolkit";
import tokenCounter from "../counter/tokenCounter";

const store = configureStore({
  reducer: {
    token: tokenCounter,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
