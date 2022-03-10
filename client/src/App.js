import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import CreateGame from "./pages/CreateGame";
import PrivateGame from "./pages/Join/PrivateGame";
import PublicGame from "./pages/Join/PublicGame";
import { useSelector } from "react-redux";

function App() {
  const gameStart = useSelector((state) => state.game.gameStart);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {gameStart && <Route path="/Game" element={<Game />} />}
      <Route path="/Create" element={<CreateGame />} />
      <Route path="/JoinPrivate" element={<PrivateGame />} />
      <Route path="/JoinPublic" element={<PublicGame />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
