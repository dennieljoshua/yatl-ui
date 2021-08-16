import {
  FocusZone,
  FocusZoneDirection,
  List,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  deleteTodo,
  fetchTodos,
  loadingSelector,
  markTodoAsDone,
  postTodo,
  todosSelector,
} from "../todoSlice";
import { Todo } from "../types";
import { TodoListItem } from "./TodoListItem";

interface TodoListProps {
  items: Array<Todo>;
}

export default function TodoList({ items }: TodoListProps) {
  const todos = useAppSelector(todosSelector);
  const loading = useAppSelector(loadingSelector);
  const dispatch = useAppDispatch();
  const [todoName, setTodoName] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  function onAddTodo(_ev: unknown) {
    const todo: Todo = {
      name: todoName,
      isDone: false,
    };

    dispatch(postTodo(todo));
    setTodoName("");
  }

  function onNameChange(_ev: unknown, value?: string) {
    if (value) {
      setTodoName(value);
    }
  }

  function onTodoDone(todo: Todo) {
    return (_ev: unknown, checked?: boolean) => {
      if (checked) {
        dispatch(markTodoAsDone(todo));
      }
    };
  }

  function onDeleteClicked(todo: Todo) {
    return () => {
      dispatch(deleteTodo(todo));
    };
  }

  const onRenderCell = (item?: Todo, index?: number) => {
    return (
      <TodoListItem
        item={item!}
        onTodoDone={onTodoDone(item!)}
        onDeleteClicked={onDeleteClicked(item!)}
      />
    );
  };

  return (
    <FocusZone direction={FocusZoneDirection.vertical}>
      <div>
        <TextField
          placeholder="Add a new Todo"
          onChange={onNameChange}
          value={todoName}
          disabled={loading}
        />
        <PrimaryButton onClick={onAddTodo} disabled={loading}>
          Add
        </PrimaryButton>
      </div>
      <List items={todos} onRenderCell={onRenderCell} />
    </FocusZone>
  );
}
