import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counterSlice";
import todoSlice from "../features/todos/todoSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        todos: todoSlice,
    },
});
