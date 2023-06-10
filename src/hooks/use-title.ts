import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { todosAtom } from '../stores/todos'

/**
 * Sets the title of the page to the todos count.
 */
export function useTitle() {
  const [todos] = useAtom(todosAtom)

  useEffect(() => {
    const completedCount = todos.filter(todo => todo.completedAt).length
    const incompleteCount = todos.length - completedCount
    const title = `Todos | ${completedCount}✅ / ${incompleteCount}❌`

    document.title = title
  }, [todos])
}
