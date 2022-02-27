import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useDrop } from "react-dnd";
import { move, setWildCard } from "../../feature/gameSlice";

function DiscardPile() {
  const discardCard = useSelector((state) => state.game.TopCard);
  const colorChosen = useSelector((state) => state.game.isColorChosen);
  const dispatch = useDispatch();
  // console.log(colorChosen);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => dispatch(move(item)),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (
      (discardCard.type === "Wild4" || discardCard.type === "Wild") &&
      colorChosen === false
    ) {
      dispatch(setWildCard(true));
    } else {
      dispatch(setWildCard(false));
    }
  }, [colorChosen, discardCard.type, dispatch]);

  return (
    <div ref={drop}>
      <img
        //style={{ width: "165px", height: "200px" }}
        style={{ width: "180px", height: "230px" }}
        src={discardCard.src}
        alt="uno card"
      />
      {
        // if isWildCard is true => display modal to choose color once color is choosen then dispatch (chooseColor)  or emit to backened (multiplayer)
        //isWildCard ? : null
      }
    </div>
  );
}

export default DiscardPile;
