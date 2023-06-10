import { Title } from './components/title'
import { TodoList } from './components/todo-list'

export function App() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center from-rose-600 to-teal-700 bg-gradient-to-br p-8 font-sans">
      <Title />
      <TodoList />
    </div>
  )
}
