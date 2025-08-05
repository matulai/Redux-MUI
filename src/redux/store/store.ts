import { configureStore } from "@reduxjs/toolkit";
import { toDoApp } from "../reducers/reducer";

export const store = configureStore({ reducer: toDoApp });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
