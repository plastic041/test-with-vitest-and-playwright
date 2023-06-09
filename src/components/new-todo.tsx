import { todosAtom } from "../stores/todos";
import { useAtom } from "jotai";
import { add } from "../lib/todos";
import type { KeyboardEvent } from "react";
import { motion } from "framer-motion";

export function NewTodo() {
  const [todos, setTodos] = useAtom(todosAtom);

  function handleAdd(event: KeyboardEvent<HTMLInputElement>) {
    const content = event.currentTarget.value;
    setTodos(add(content, todos));
    event.currentTarget.value = "";
  }

  return (
    <motion.div layout className="flex flex-row">
      <input
        className="flex-1 border-b-2 outline-none focus:border-blue-300 transition-colors rounded-none"
        type="text"
        placeholder="Add a todo"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value !== "") {
            handleAdd(e);
          }
        }}
        name="new todo"
        aria-label="Add a Todo"
      />
    </motion.div>
  );
}
