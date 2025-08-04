import { configureStore } from "@reduxjs/toolkit";
import { toDoApp } from '../reducers/reducer';

const store = configureStore({ reducer: toDoApp });

export default store;