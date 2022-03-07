import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useDrop } from "react-dnd";
import { move, setWildCard } from "../../feature/gameSlice";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  img: {
    width: "180px",
    height: "230px",

    "@media (min-width: 180px) and (max-width: 299px)": {
      width: "100px",
      height: "120px",
    },

    "@media (min-width: 300px) and (max-width: 700px)": {
      width: "115px",
      height: "140px",
    },
  },
}));

function DiscardPile() {
  const discardCard = useSelector((state) => state.game.TopCard);
  const colorChosen = useSelector((state) => state.game.isColorChosen);
  const dispatch = useDispatch();
  const { classes } = useStyles();
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
        className={classes.img}
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
