import React, { useEffect, useState } from "react";

import Deck from "../../classes/Deck";

function DiscardPile() {
  const [topCard, setTopCard] = useState([]);
  const [deck, setDeck] = useState([]);
  useEffect(() => {
    let deck = new Deck();
    setDeck(deck);
    setTopCard(deck.removeCard());
  }, []);
  return (
    <div>
      <img
        //style={{ width: "165px", height: "200px" }}
        style={{ width: "180px", height: "230px" }}
        src={topCard.src}
        alt="uno card"
        onClick={() => {
          console.log(deck.removeCard());
        }}
      />
    </div>
  );
}

export default DiscardPile;
