import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { move } from "../../feature/gameSlice";
import { useDrop } from "react-dnd";

function DiscardPile() {
  const discardCard = useSelector((state) => state.game.TopCard);
  const [isWildCard, setisWildCard] = useState(false);
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => dispatch(move(item)),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (discardCard.type === "wild") {
      setisWildCard(true);
    } else {
      setisWildCard(false);
    }
  }, [discardCard]);

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
