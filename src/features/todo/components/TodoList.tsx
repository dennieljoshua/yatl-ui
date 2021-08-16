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
import {
  fetchTodos,
  loadingSelector,
  markTodoAsDone,
  postTodo,
  todosSelector,
} from "../todoSlice";
import { Todo } from "../types";

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
  }, []);

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

  const onRenderCell = (item?: Todo, index?: number) => (
    <div className="TodoListItem" data-is-focusable={true} key={item?.id}>
      <Checkbox
        checked={item?.isDone}
        onChange={onTodoDone(item!)}
        disabled={item?.isDone}
      />
      <div className="TodoListItem-Text">
        {item?.isDone ? <del>{item?.name}</del> : <span>{item?.name}</span>}
      </div>
    </div>
  );

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
