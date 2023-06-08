import { TodoList } from "./todo-list";

export function App() {
  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gradient-to-r from-rose-100 to-teal-100 font-sans">
      <TodoList />
    </div>
  );
}
