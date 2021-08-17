import "./App.css";
import TodoList from "./features/todo/components/TodoList";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

function App() {
  initializeIcons();
  return (
    <div className="App">
      <h1 className="Title">Yet Another Todo List</h1>
      <TodoList items={[]} />
    </div>
  );
}

export default App;
