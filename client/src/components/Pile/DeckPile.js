import React from "react";

import { BACKCARD } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { draw } from "../../feature/gameSlice";
import { createStyles } from "@mantine/core";
import socket from "../../app/socket";
import { useParams } from "react-router-dom";

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
  const { id } = useParams();

  return (
    <img
      draggable="false"
      className={classes.img}
      src={BACKCARD}
      alt="uno back card"
      onClick={(e) => {
        socket.emit("draw", { roomID: id, playerID: socket.id });
      }}
    />
  );
}

export default DeckPile;
