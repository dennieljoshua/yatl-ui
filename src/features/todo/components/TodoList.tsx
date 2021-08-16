import {
  Checkbox,
  FocusZone,
  FocusZoneDirection,
  List,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchTodos, postTodo, todosSelector } from "../todoSlice";
import { Todo } from "../types";

interface TodoListProps {
  items: Array<Todo>;
}

export default function TodoList({ items }: TodoListProps) {
  const todos = useAppSelector(todosSelector);
  const dispatch = useAppDispatch();
  const [todoName, setTodoName] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  function onAddTodo(_ev: unknown) {
    const todo: Todo = {
      name: todoName,
      isDone: false,
    };

    console.log("creating", todo);

    dispatch(postTodo(todo));
  }

  function onNameChange(_ev: unknown, value?: string) {
    if (value) {
      setTodoName(value);
    }
  }

  const onRenderCell = (item?: Todo, index?: number) => (
    <div className="TodoListItem" data-is-focusable={true} key={item?.id}>
      <Checkbox />
      <div className="TodoListItem-Text">{item?.name}</div>
    </div>
  );

  return (
    <FocusZone direction={FocusZoneDirection.vertical}>
      <div>
        <TextField placeholder="Add a new Todo" onChange={onNameChange} />
        <PrimaryButton onClick={onAddTodo}>Add</PrimaryButton>
      </div>
      <List items={todos} onRenderCell={onRenderCell} />
    </FocusZone>
  );
}
