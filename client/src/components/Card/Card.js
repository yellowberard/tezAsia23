import React from "react";
import { useDrag } from "react-dnd";

function Card({ card, playerID }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { card: card, player: playerID },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <img
      ref={drag}
      style={{ width: "145px", height: "215px" }}
      src={card.src}
      alt="uno card"
    />
  );
}

export default Card;
