import { todosAtom } from "./stores/todos";
import { useAtom } from "jotai";
import { add } from "./lib/todos";
import type { KeyboardEvent } from "react";
import { TodoItem } from "./todo-item";
import { motion, AnimatePresence } from "framer-motion";

export function TodoList() {
  const [todos, setTodos] = useAtom(todosAtom);

  function handleAdd(event: KeyboardEvent<HTMLInputElement>) {
    const content = event.currentTarget.value;
    setTodos(add(content, todos));
    event.currentTarget.value = "";
  }

  return (
    <div className="flex p-8 bg-white shadow-xl rounded-md flex-col h-xl w-lg">
      <h2 className="text-6xl mb-4 font-100 select-none cursor-default">
        TODO
      </h2>
      <motion.div layout className="flex flex-row">
        <input
          className="flex-1 border-b-2 outline-none focus:border-blue-300 transition-colors"
          type="text"
          placeholder="Add a todo"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value !== "") {
              handleAdd(e);
            }
          }}
        />
      </motion.div>
      <ul className="flex flex-col mt-4 gap-2">
        <AnimatePresence initial={false} mode="popLayout">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
