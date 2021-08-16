import {
  Checkbox,
  FocusZone,
  FocusZoneDirection,
  List,
  TextField,
} from "@fluentui/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchTodos, todosSelector } from "../todoSlice";
import { Todo } from "../types";

interface TodoListProps {
  items: Array<Todo>;
}

export default function TodoList({ items }: TodoListProps) {
  const todos = useAppSelector(todosSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  function onAddTodo(_ev: unknown, value?: string) {
    console.log(value);
  }

  const onRenderCell = (item?: Todo, index?: number) => (
    <div className="TodoListItem" data-is-focusable={true} key={item?.id}>
      <Checkbox />
      <div className="TodoListItem-Text">{item?.name}</div>
    </div>
  );

  return (
    <FocusZone direction={FocusZoneDirection.vertical}>
      <TextField label="Add todo" onChange={onAddTodo} />
      <List items={todos} onRenderCell={onRenderCell} />
    </FocusZone>
  );
}
