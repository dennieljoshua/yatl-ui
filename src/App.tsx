import "./App.css";
import TodoList from "./features/todo/components/TodoList";

function App() {
  return (
    <div className="App">
      <h1 className="Title">YATL</h1>
      <TodoList items={[]} />
    </div>
  );
}

export default App;
