import React from "react";
import DeckPile from "./DeckPile";
import DiscardPile from "./DiscardPile";
import "./Pile.css";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",

    border: ` ${theme.colors.blue[4]} solid 10px `,
    borderRadius: "15px",

    width: "360px",

    gap: "5px",
    alignItems: "center",
    justifyContent: "center",
    contain: "content",

    position: "absolute",
    top: "48%",
    left: "48%",
    transform: "translateX(-50%) translateY(-50%)",
  },
}));

function Pile() {
  const { classes } = useStyles();
  return (
    <>
      <div className={classes.container}>
        <DeckPile />
        <DiscardPile />
      </div>
    </>
  );
}

export default Pile;
