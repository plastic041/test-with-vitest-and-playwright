import { atomWithStorage } from "jotai/utils";
import type { Todo } from "../typings/todo";

export const todosAtom = atomWithStorage<Todo[]>("todos", []);
