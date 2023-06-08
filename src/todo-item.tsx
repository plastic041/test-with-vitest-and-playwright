import type { Todo } from "./typings/todo";
import { IconButton } from "./components/ui/icon-button";
import { clsx } from "clsx";
import type { ChangeEvent } from "react";
import { edit, remove, toggle } from "./lib/todos";
import { todosAtom } from "./stores/todos";
import { useAtom } from "jotai";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "./lib/date-format";
import { forwardRef } from "react";

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = forwardRef<HTMLLIElement, TodoItemProps>(
  function TodoItem({ todo }, ref) {
    const [todos, setTodos] = useAtom(todosAtom);
    const isComplete = todo.completedAt !== undefined;

    function handleToggle(id: Todo["id"]) {
      setTodos(toggle(id, todos));
    }

    function handleEdit(id: Todo["id"], event: ChangeEvent<HTMLInputElement>) {
      const content = event.currentTarget.value;
      setTodos(edit(id, content, todos));
    }

    function handleRemove(id: Todo["id"]) {
      setTodos(remove(id, todos));
    }

    return (
      <motion.li
        ref={ref}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-row items-center group"
      >
        <input
          type="checkbox"
          checked={isComplete}
          onChange={() => handleToggle(todo.id)}
          className="display-none"
          id={`todo-${todo.id}`}
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className={clsx(
            "flex h-6 w-6 border rounded items-center justify-center cursor-pointer transition-colors",
            isComplete
              ? "bg-teal-500 text-white border-transparent hover:bg-teal-400"
              : "bg-white text-teal-500 border-teal-500 hover:bg-teal-100"
          )}
          aria-hidden
        >
          <span
            className={clsx(
              "i-radix-icons-check h-4 w-4",
              isComplete ? "block" : "hidden"
            )}
          />
        </label>
        <div className="flex flex-row ml-2 flex-1 items-center">
          <input
            type="text"
            value={todo.content}
            onChange={(e) => handleEdit(todo.id, e)}
            className={clsx(
              "flex-1 outline-none focus:border-blue-200 transition-colors border-b-2 border-transparent text-lg hover:border-teal-300",
              isComplete ? "line-through text-gray-400" : "text-gray-900"
            )}
          />
          <AnimatePresence key={`${todo.id}-completed`} initial={false}>
            {todo.completedAt && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="ml-2 text-gray-400 text-xs"
              >
                @{formatDate(new Date(todo.completedAt))}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <IconButton
          onClick={() => handleRemove(todo.id)}
          className="group-hover:opacity-100 opacity-0 transition-opaticy ml-2"
        >
          <span className="i-radix-icons-trash text-red-500" />
        </IconButton>
      </motion.li>
    );
  }
);
