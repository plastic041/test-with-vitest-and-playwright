import type { Todo } from "../typings/todo";
import { produce } from "immer";

/**
 * Returns a new array of todos with the given todo toggled.
 */
export function toggle(id: Todo["id"], todos: Todo[]): Todo[] {
  return produce(todos, (draft) => {
    const todo = draft.find((todo) => todo.id === id);
    if (todo) {
      todo.completedAt = todo.completedAt ? undefined : new Date().toString();
    }
  });
}

/**
 * Returns a new array of todos with the given todo removed.
 */
export function remove(id: Todo["id"], todos: Todo[]): Todo[] {
  return todos.filter((todo) => todo.id !== id);
}

/**
 * Returns a new array of todos with the given todo added.
 * The new todo will be added to the end of the array.
 */
export function add(content: Todo["content"], todos: Todo[]): Todo[] {
  const id = Math.random().toString();
  return produce(todos, (draft) => {
    draft.push({
      id,
      content,
      completedAt: new Date().toString(),
    });
  });
}

/**
 * Returns a new array of todos with the given todo edited.
 */
export function edit(
  id: Todo["id"],
  content: Todo["content"],
  todos: Todo[]
): Todo[] {
  return produce(todos, (draft) => {
    const todo = draft.find((todo) => todo.id === id);
    if (todo) {
      todo.content = content;
    }
  });
}
