import { useAtom } from 'jotai'
import { AnimatePresence, Reorder, motion } from 'framer-motion'
import { todosAtom } from '../stores/todos'
import { sort } from '../lib/todos'
import { TodoItem } from './todo-item'
import { NewTodo } from './new-todo'

export function TodoList() {
  const [todos, setTodos] = useAtom(todosAtom)

  function handleSort() {
    setTodos(sort(todos))
  }

  return (
    <div
      id="todo-list"
      className="max-h-4xl max-w-screen w-lg flex flex-1 flex-col overflow-y-hidden rounded-none bg-white p-8 shadow-xl md:rounded-md"
    >
      <h2 className="mb-4 cursor-default select-none text-6xl font-100">
        TODO
      </h2>
      <NewTodo />
      <div className="mt-2 flex flex-row justify-end">
        <button
          className="h-8 w-20 flex select-none items-center justify-center border border-teal-500 rounded bg-white text-teal-900 transition-colors hover:bg-teal-100"
          onClick={handleSort}
        >
          <span className="i-lucide-sort-desc" />
          <span className="ml-2">Sort</span>
        </button>
      </div>
      <div className="relative mt-2 flex flex-1 flex-col overflow-y-hidden">
        <AnimatePresence initial={false}>
          {todos.length > 0 && (
            <motion.div
              className="flex flex-1 overflow-y-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Reorder.Group
                className="flex flex-1 flex-col gap-2 overflow-y-scroll pb-16 pr-5"
                values={todos}
                onReorder={setTodos}
                axis="y"
                layoutScroll
              >
                <AnimatePresence initial={false} mode="popLayout">
                  {todos.map(todo => (
                    <TodoItem todo={todo} key={todo.id} />
                  ))}
                </AnimatePresence>
              </Reorder.Group>
            </motion.div>
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
  )
}
