import { useEffect, useState } from "react";

import { shuffle } from "./../utils";
import Player from "../classes/Player";
import Deck from "../classes/Deck";
import GameState from "../classes/GameState";

function Game() {
  // const [card, setCardSrc] = useState([]);

  useEffect(() => {
    let deck = new Deck();
    //console.log(deck);

    let player1 = new Player("1234", "player1", "jd3jds");
    // let card1 = deck.removeCard();
    // player1.addCardToHand(card1);
    //player1.addCardToHand(deck.removeCard());
    //player1.removeCardFromHand(card1.getCardID);

    console.log(player1);
    // let player2 = new Player("1789", "player2", "jd3jds");
    // let player3 = new Player("30489", "player3", "jd3jds");

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
    <div>
      Game
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
    </div>
  );
}

export default Game;
