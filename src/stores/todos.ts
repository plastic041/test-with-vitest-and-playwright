import { atomWithStorage } from "jotai/utils";
import type { Todo } from "../typings/todo";

export const todosAtom = atomWithStorage<Todo[]>("todos", [
  {
    id: "1",
    content: "SuperStore 개발",
    completedAt: new Date(),
  },
  {
    id: "2",
    content: "SuperStore 배포",
    completedAt: new Date(),
  },
]);
