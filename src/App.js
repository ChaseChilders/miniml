import "./App.css";
import Pomodoro from "./components/Pomodoro";
import Todolist from "./components/Todolist";

function App() {
  return (
    <div className="App">
      <header className="logo">miniml.</header>
      <Todolist />
      <Pomodoro />
    </div>
  );
}

export default App;
