import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTodos = createAsyncThunk(
    "todos/getAllTodos",
    async (_, { getState }) => {
        try {
            const { data } = await axios.get(
                "https://jsonplaceholder.typicode.com/todos"
            );

            return data.slice(0, 5);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

const todoAdapter = createEntityAdapter({
    sortComparer: (a, b) => {
        console.log(a, b);
        return a?.id.toString().localeCompare(b?.id.toString());
    },
});

const initialState = todoAdapter.getInitialState({
    loading: false,
});

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addNewTodo: (state, action) => {
            const newTodo = {
                userId: Math.floor(Math.random() * 20) + 1,
                id: state.ids.length + 1,
                title: action.payload,
                completed: false,
            };

            // state.todos = [...state.todos, newTodo];
            todoAdapter.addOne(state, { ...newTodo });
        },
        removeTodo: (state, action) => {
            // state.todos = state.todos.filter(
            //     (todo) => todo?.id !== action.payload
            // );
            todoAdapter.removeOne(state, action.payload);
        },
        addFire: (state, action) => {
            // state.todos = state.todos.map((todo) =>
            //     todo.id === action.payload
            //         ? {
            //               id: todo.id,
            //               title: todo.title,
            //               completed: false,
            //               onFire: parseInt(todo.onFire) + 1,
            //           }
            //         : todo
            // );
            // const existedPost = state.entities[action.payload];
            // if (existedPost) existedPost.onFire += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTodos.pending, (state, action) => {
                state.loading = true;
                // state.todos = [];
            })
            .addCase(getAllTodos.fulfilled, (state, action) => {
                state.loading = false;
                // state.todos = [...action.payload];
                todoAdapter.upsertMany(state, action.payload);
            })
            .addCase(getAllTodos.rejected, (state, action) => {
                state.loading = false;
                // state.todos = [];
                state.error = action.payload;
            });
    },
});

export const {
    selectAll: selectAllTodos,
    selectIds: selectTodoIds,
    selectById: selectTodoById,
    selectEntities,
} = todoAdapter.getSelectors((state) => state.todos);

export const { addNewTodo, removeTodo, addFire } = todoSlice.actions;

export default todoSlice.reducer;
