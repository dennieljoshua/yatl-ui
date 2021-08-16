import {
  Checkbox,
  IconButton,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import React, { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { updateTodo } from "../todoSlice";
import { Todo } from "../types";

interface TodoListItemProps {
  item: Todo;
  onTodoDone: (ev: unknown, checked?: boolean) => void;
  onDeleteClicked: () => void;
}

export function TodoListItem({
  item,
  onTodoDone,
  onDeleteClicked,
}: TodoListItemProps) {
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [todoName, setTodoName] = useState(item.name);

  function onSaveClick() {
    dispatch(
      updateTodo({
        id: item.id,
        name: todoName,
        isDone: item.isDone,
      })
    );

    setIsEditing(false);
  }

  return (
    <div className="TodoListItem" data-is-focusable={true} key={item?.id}>
      <Checkbox
        checked={item?.isDone}
        onChange={onTodoDone}
        disabled={item?.isDone}
      />
      <div className="TodoListItem-Text">
        {!isEditing && <span>{item?.name}</span>}
        {isEditing && (
          <>
            <TextField
              className="TodoListItem-Text__Editor"
              onChange={(ev, value) => setTodoName(value!)}
              value={todoName}
            />
            <PrimaryButton onClick={onSaveClick}>Save</PrimaryButton>
          </>
        )}
      </div>
      <div className="TodoListItem-Buttons">
        <IconButton
          iconProps={{ iconName: "Edit" }}
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        />
        <IconButton
          iconProps={{ iconName: "Delete" }}
          onClick={onDeleteClicked}
        />
      </div>
    </div>
  );
}
