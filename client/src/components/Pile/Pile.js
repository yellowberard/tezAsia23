import React from "react";
import DeckPile from "./DeckPile";
import DiscardPile from "./DiscardPile";
import "./Pile.css";
import { createStyles, Text, Group } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";

const useStyles = createStyles((theme, { color }) => ({
  container: {
    display: "flex",

    border: ` ${theme.colors.blue[4]} solid 10px `,
    borderRadius: "15px",

    width: "480px",

    gap: "5px",
    alignItems: "center",
    justifyContent: "center",
    contain: "content",

    position: "absolute",
    top: "48%",
    left: "48%",
    transform: "translateX(-50%) translateY(-50%)",
  },
  background: {
    backgroundColor: ` ${theme.colors.gray[0]}`,
  },
  //Design taken from https://css-tricks.com/the-shapes-of-css/
  diamond: {
    width: "0",
    height: "0",
    border: "50px solid transparent",

    borderBottomColor: `${theme.colors[color][4]}`,

    position: "relative",
    top: "-50px",

    "&:after": {
      content: "''",
      position: "absolute",
      left: "-50px",
      top: "50px",
      width: "0",
      height: "0",
      border: "50px solid transparent",
      borderTopColor: `${theme.colors[color][4]}`,
    },
  },
}));

function Pile() {
  const currentColor = useSelector((state) => state.game.currentColor);
  const color = currentColor.toLowerCase();

  const { classes } = useStyles({ color });

  return (
    <>
      <div className={classes.container}>
        <DeckPile />
        <DiscardPile />
        <Group
          position="center"
          direction="column"
          className={classes.background}
        >
          <Text weight={700}>Current Color:</Text>
          <div className={classes.diamond}></div>
        </Group>
      </div>
    </>
  );
}

export default Pile;
