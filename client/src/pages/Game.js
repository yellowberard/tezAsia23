import React, { useEffect, useState } from "react";

import Player from "../classes/Player";
//import Deck from "../classes/Deck";
//import GameState from "../classes/GameState";
import Pile from "../components/Pile/Pile";

import { useMantineTheme } from "@mantine/core";
import TopHand from "../components/Hand/TopHand";
import PlayerHand from "../components/Hand/PlayerHand";
import RightHand from "../components/Hand/RightHand";
import LeftHand from "../components/Hand/LeftHand";

function Game() {
  // const [card, setCardSrc] = useState([]);
  const [players, setPlayers] = useState([]);

  const theme = useMantineTheme();

  const positions = [TopHand, RightHand, LeftHand];

  useEffect(() => {
    //let deck = new Deck();
    //console.log(deck);
    let player1 = new Player("1234", "player1", "jd3jds");
    // let card1 = deck.removeCard();
    // player1.addCardToHand(card1);
    //player1.addCardToHand(deck.removeCard());
    //player1.removeCardFromHand(card1.getCardID);
    //console.log(player1);
    let player2 = new Player("1789", "player2", "jd3jds");
    let player3 = new Player("30489", "player3", "jd3jds");
    let player4 = new Player("313569", "player4", "jd3jds");
    setPlayers([player1, player2, player3, player4]);

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
  }, []);

  return (
    <div
      style={{
        margin: "0px",
        padding: "0px",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundSize: "100%",

        background: `radial-gradient(circle at center, ${theme.colors.orange[8]}, ${theme.colors.red[8]}, ${theme.colors.red[8]})`,
      }}
    >
      <Pile />
      {/*card.map((card1, i) => {
        return (
          <img
            key={i}
            src={card1.src}
            alt=""
            style={{ width: "100px", height: "130px" }}
          />
        );
      }) */}
      {
        //console.log(players.length)
      }
      {/*       {positions.slice(0, players.length).map((Component, idx) => {
          //console.log(players[]);
          // console.log(Component);

          //console.log(idx);
          if (player.id === "1234") {
            //console.log(idx);
            index = idx;
            return <PlayerHand key={players[idx].id} player={player} />;
          }
          //console.log(Component);
          //console.log(Component);

          return <Component key={players[idx].id} player={player} />;
        });
      })} */}
      {players.map((player, idx) => {
        if (player.id === "1234") {
          return <PlayerHand key={player.id} player={player} />;
        }

        return positions.splice(0, 1).map((Component, idx) => {
          return <Component key={player.id} player={player} />;
        });
      })}
    </div>
  );
}

export default Game;
