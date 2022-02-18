import React from "react";
import { useSelector } from "react-redux";

function DiscardPile() {
  const discardCard = useSelector((state) => state.game.TopCard);

  return (
    <div>
      <img
        //style={{ width: "165px", height: "200px" }}
        style={{ width: "180px", height: "230px" }}
        src={discardCard.src}
        alt="uno card"
      />
    </div>
  );
}

export default DiscardPile;
