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
      className="bg-white flex flex-1 p-8 shadow-xl rounded-none md:rounded-md flex-col w-lg max-w-screen overflow-hidden max-h-4xl"
    >
      <h2 className="text-6xl mb-4 font-100 select-none cursor-default">
        TODO
      </h2>
      <NewTodo />
      <div className="flex flex-row justify-end mt-2">
        <button
          className="flex justify-center items-center h-8 w-16 bg-white hover:bg-teal-100 rounded transition-colors text-teal-900"
          onClick={handleSort}
        >
          sort
        </button>
      </div>
      <div className="flex flex-1 flex-col relative">
        <AnimatePresence initial={false}>
          {todos.length > 0 && (
            <motion.ul
              className="flex flex-col mt-2 gap-2 min-h-0 overflow-y-auto flex-1"
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
              className="flex items-center justify-center flex-1 absolute inset-0"
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
