import React from "react";
import { useDrag } from "react-dnd";
import { createStyles, Image } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  img: {
    width: "145px",
    height: "215px",

    "@media (min-width: 180px) and (max-width: 299px)": {
      width: "70px",
      height: "100px",
    },

    "@media (min-width: 300px) and (max-width: 576px)": {
      width: "100px",
      height: "135px",
    },
  },
}));

function Card({ card, playerID }) {
  const { classes } = useStyles();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { card: card, player: playerID },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return <Image className={classes.img} src={card.src} />;
}

export default Card;
