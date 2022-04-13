import React from "react";

import { BACKCARD } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { draw } from "../../feature/gameSlice";
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

function DeckPile() {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  return (
    <img
      draggable="false"
      className={classes.img}
      src={BACKCARD}
      alt="uno back card"
      onClick={(e) => {
        dispatch(draw());
      }}
    />
  );
}

export default DeckPile;
