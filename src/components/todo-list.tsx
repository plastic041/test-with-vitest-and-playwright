import { todosAtom } from "../stores/todos";
import { useAtom } from "jotai";
import { TodoItem } from "./todo-item";
import { AnimatePresence, motion } from "framer-motion";
import { NewTodo } from "./new-todo";
import { sort } from "../lib/todos";

export function TodoList() {
  const [todos, setTodos] = useAtom(todosAtom);

  function handleSort() {
    setTodos(sort(todos));
  }

  return (
    <div
      id="todo-list"
      className="max-h-4xl max-w-screen w-lg flex flex-1 flex-col overflow-hidden rounded-none bg-white p-8 shadow-xl md:rounded-md"
    >
      <h2 className="mb-4 cursor-default select-none text-6xl font-100">
        TODO
      </h2>
      <NewTodo />
      <div className="mt-2 flex flex-row justify-end">
        <button
          className="h-8 w-16 flex items-center justify-center border border-teal-500 rounded bg-white text-teal-900 transition-colors hover:bg-teal-100"
          onClick={handleSort}
        >
          sort
        </button>
      </div>
      <div className="relative flex flex-1 flex-col">
        <AnimatePresence initial={false}>
          {todos.length > 0 && (
            <motion.ul
              className="mt-2 min-h-0 flex flex-1 flex-col gap-2 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {todos.length === 0 && (
            <motion.div
              className="absolute inset-0 flex flex-1 items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="text-2xl text-teal-500">No todos yet</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
