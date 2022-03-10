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
      //console.log("true");
    };
    //console.log(deck);
    // let player1 = new Player("1234", "player1", "jd3jds");
    // let card1 = deck.removeCard();
    // player1.addCardToHand(card1);
    //player1.addCardToHand(deck.removeCard());
    //player1.removeCardFromHand(card1.getCardID);
    //console.log(player1);
    // let player2 = new Player("1789", "player2", "jd3jds");
    //let player3 = new Player("30489", "player3", "jd3jds");
    //let player4 = new Player("313569", "player4", "jd3jds");
    //let gameState = new GameState([player1, player2]);
    //setPlayers(gameState.getPlayers());
    // setTopCard(gameState.getTopCard());
    //console.log(players);
    //let gamestate = new GameState([player1, player2, player3], deck);
    //console.log(gamestate);
    //gamestate.getTopCard();
    //console.log("This the deck: ", deck);
    //console.log("this deck.cards: ", deck.cards);
    //deck.shuffle();
    //console.log("shuffle cards: ", deck.cards);
    //let player1 = new Player(1234, "player1", "djd45");
    //let topCard = gamestate.removeCard();
    //setCardSrc(topCard.getImageSrc());
    //setCardSrc(player1.hand.cards);
    //console.log(player1.cards);
    //console.log(player1.hand.cards);
    //player1.addCardToHand(topCard);
    // player1.removeCardFromHand(topCard.getCardID());
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
      <Pile />
      {playersList.map((player) => {
        if (player.id === "1234") {
          return <PlayerHand key={player.id} player={player} />;
        }

        return positions.splice(0, 1).map((Component) => {
          return <Component key={player.id} player={player} />;
        });
      })}
      {isWildCard && <ColorChooser />}
      {
        //isWin display who won here !
        isWin && <Win />
      }
    </div>
  );
}

export default Game;
