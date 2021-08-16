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

export const markTodoAsDone = createAsyncThunk(
  "todo/markAsDone",
  async (todo: Todo) => {
    const response = await fetch(`http://localhost:3001/api/todo/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        isDone: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (todo: Todo) => {
    const response = await fetch(`http://localhost:3001/api/todo/${todo.id}`, {
      method: "DELETE",
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
      })
      .addCase(markTodoAsDone.pending, (state) => {
        state.loading = true;
      })
      .addCase(markTodoAsDone.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === +action.payload.id
        );
        state.todos[index].isDone = action.payload.isDone;
        // Move todo to the end of the list
        const item = state.todos.splice(index, 1);
        state.todos.push(item[0]);
        state.loading = false;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo.id !== +action.payload.id
        );
        state.loading = false;
      });
  },
});

// Actions
export const { getTodos, getTodosSuccess, createTodo, createTodoSuccess } =
  todoSlice.actions;

// Selectors
export const todosSelector = (state: RootState) => state.todo.todos;
export const loadingSelector = (state: RootState) => state.todo.loading;

export default todoSlice.reducer;
