import "./App.css";
import Gameboard from "./Components/Gameboard/Gameboard";
import Menu from "./Components/Menu/Menu";

function App() {
  return (
    <div className="App">
      <h1>Dragons Before Dinner</h1>
      <Menu />
      <Gameboard />
    </div>
  );
}

export default App;
