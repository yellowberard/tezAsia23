import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//import Player from "../classes/Player";
//import Deck from "../classes/Deck";
//import GameState from "../classes/GameState";
import Pile from "../components/Pile/Pile";
import { useSelector, useDispatch } from "react-redux";

import { useMantineTheme } from "@mantine/core";
import TopHand from "../components/Hand/TopHand";
import PlayerHand from "../components/Hand/PlayerHand";
import RightHand from "../components/Hand/RightHand";
import LeftHand from "../components/Hand/LeftHand";
import ColorChooser from "../components/ColorChooser/ColorChooser";
import Win from "../components/Win/Win";

import socket from "../app/socket";

function Game() {
  //const [topCard, setTopCard] = useState([]);
  //const [players, setPlayers] = useState([]);

  const playersList = useSelector((state) => state.game.players);
  const isWildCard = useSelector((state) => state.game.isWild);
  const isWin = useSelector((state) => state.game.isWin);
  //console.log(isWildCard);
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const positions = [TopHand, RightHand, LeftHand];

  useEffect(() => {
    window.onpopstate = (e) => {
      navigate("/");
    };
  }, [navigate]);

  return (
    <div
      style={{
        margin: "0px",
        padding: "0px",
        height: "100vh",
        width: "100%",
        position: "absolute",
        bottom: "0",
        overflow: "hidden",
        backgroundSize: "100%",

        background: `radial-gradient(circle at center, ${theme.colors.orange[8]}, ${theme.colors.red[8]}, ${theme.colors.red[8]})`,
      }}
    >
      {/* <Pile />

      {playersList.map((player) => {
        if (player.id === socket.id) {
          return <PlayerHand key={player.id} player={player} />;
        }

        return positions.splice(0, 1).map((Component) => {
          return <Component key={player.id} player={player} />;
        });
      })}

      {isWildCard && <ColorChooser />}
        isWin && <Win /> */}
    </div>
  );
}

export default Game;
