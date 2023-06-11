import { clsx } from 'clsx'
import { useAtom } from 'jotai'
import { AnimatePresence, Reorder, motion, useDragControls } from 'framer-motion'
import { forwardRef } from 'react'
import type { ChangeEvent, PointerEvent } from 'react'
import { edit, remove, toggle } from '../lib/todos'
import { todosAtom } from '../stores/todos'
import { formatDate } from '../lib/date-format'
import type { Todo } from '../typings/todo'
import { IconButton } from './ui/icon-button'

interface TodoItemProps {
  todo: Todo
}

export const TodoItem = forwardRef<HTMLDivElement, TodoItemProps>(
  ({ todo }, ref) => {
    const [todos, setTodos] = useAtom(todosAtom)
    const isComplete = todo.completedAt !== undefined
    const controls = useDragControls()

    function handleToggle(id: Todo['id']) {
      setTodos(toggle(id, todos))
    }

    function handleEdit(id: Todo['id'], event: ChangeEvent<HTMLInputElement>) {
      const content = event.currentTarget.value
      setTodos(edit(id, content, todos))
    }

    function handleRemove(id: Todo['id']) {
      setTodos(remove(id, todos))
    }

    function handleDrag(e: PointerEvent<HTMLDivElement>) {
      controls.start(e)
    }

    return (
      <Reorder.Item
        ref={ref}
        value={todo}
        dragListener={false}
        dragControls={controls}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full flex flex-row select-none items-center"
      >
        <div
          className="drag-control h-8 w-8 flex cursor-grab items-center justify-center"
          onPointerDown={handleDrag}
        >
          <span
            aria-label={`Drag ${todo.content} to reorder`}
            className="i-lucide-grip-vertical"
          />
        </div>
        <input
          type="checkbox"
          onClick={() => handleToggle(todo.id)}
          className="hidden"
          id={`todo-${todo.id}`}
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className="group h-8 w-8 flex shrink-0 cursor-pointer items-center justify-center"
          aria-label={`Mark ${todo.content} as ${
            isComplete ? 'incomplete' : 'completed'
          }`}
        >
          <div
            className={clsx(
              'flex h-4 w-4 border rounded items-center justify-center transition-colors',
              isComplete
                ? 'bg-teal-500 text-white border-transparent group-hover:bg-teal-400'
                : 'bg-white text-teal-500 border-teal-500 group-hover:bg-teal-100',
            )}
          >
            <span
              className={clsx(
                'i-lucide-check h-4 w-4 pointer-events-none',
                isComplete ? 'block' : 'hidden',
              )}
              aria-hidden
            />
          </div>
        </label>
        <div className="ml-2 flex flex-1 flex-row items-center">
          <input
            type="text"
            value={todo.content}
            onChange={e => handleEdit(todo.id, e)}
            className={clsx(
              'flex-1 w-0 outline-none focus:border-b-blue-200 transition-colors border-t-2 border-b-2 border-transparent text-lg hover:border-b-teal-300 rounded-none select-text',
              isComplete ? 'line-through text-gray-400' : 'text-gray-900',
            )}
            aria-label={`${todo.content}`}
          />
          <AnimatePresence key={`${todo.id}-completed`} initial={false}>
            {todo.completedAt && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
                className="ml-2 break-keep text-xs text-gray-400"
              >
                @{formatDate(new Date(todo.completedAt))}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <IconButton
          onClick={() => handleRemove(todo.id)}
          className="ml-4 shrink-0"
          aria-label={`Remove ${todo.content}`}
        >
          <span className="i-lucide-trash text-red-500" />
        </IconButton>
      </Reorder.Item>
    )
  },
)
