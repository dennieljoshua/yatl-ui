import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Todo } from "./types";

export interface TodoState {
  todos: Array<Todo>;
  loading: boolean;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
};

export const fetchTodos = createAsyncThunk("todo/getTodos", async () => {
  const response = await fetch("http://localhost:3001/api/todo");
  return await response.json();
});

export const postTodo = createAsyncThunk(
  "todo/createTodo",
  async (todo: Todo) => {
    const response = await fetch("http://localhost:3001/api/todo", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getTodos: (state) => {
      state.loading = true;
    },
    getTodosSuccess: (state, { payload }) => {
      state.todos = payload;
      state.loading = false;
    },
    createTodo: (state) => {
      state.loading = true;
    },
    createTodoSuccess: (state, { payload }) => {
      state.todos.push(payload);
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(postTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.loading = false;
      });
  },
});

// Actions
export const { getTodos, getTodosSuccess, createTodo, createTodoSuccess } =
  todoSlice.actions;

// Selectors
export const todosSelector = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;
