import { Todo } from "./types";

export async function createTodo(todo: Todo) {
  return await fetch("/api/todo", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
}
