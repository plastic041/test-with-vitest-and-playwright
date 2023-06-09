import { Title } from "./components/title";
import { TodoList } from "./components/todo-list";

export function App() {
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-gradient-to-br from-rose-600 to-teal-700 font-sans p-8">
      <Title />
      <TodoList />
    </div>
  );
}
