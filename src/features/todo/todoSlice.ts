import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Todo } from "./types";

export interface TodoState {
  todos: Array<Todo>;
  loading: boolean;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
};

export const createTodo = createAsyncThunk(
  "todo/create",
  async (todo: Todo) => {
    const response: any = await createTodo(todo);

    return response.data;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    create: (state) => {
      state.loading = true;
    },
  },
});

export default todoSlice.reducer;
