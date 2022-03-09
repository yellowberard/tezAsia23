import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import CreateGame from "./pages/CreateGame";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Game" element={<Game />} />
      <Route path="/Create" element={<CreateGame />} />
    </Routes>
  );
}

export default App;
