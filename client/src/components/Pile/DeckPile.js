import React from "react";

import { BACKCARD } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { draw } from "../../feature/gameSlice";

function DeckPile() {
  const dispatch = useDispatch();
  return (
    <img
      style={{ width: "180px", height: "230px" }}
      src={BACKCARD}
      alt="uno back card"
      onClick={() => {
        dispatch(draw());
      }}
    />
  );
}

export default DeckPile;
