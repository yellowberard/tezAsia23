import React from "react";

import { BACKCARD } from "../../utils/constants";

function DeckPile() {
  return (
    <img
      style={{ width: "180px", height: "230px" }}
      src={BACKCARD}
      alt="uno back card"
    />
  );
}

export default DeckPile;
