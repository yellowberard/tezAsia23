import React from "react";
import { createStyles, Text } from "@mantine/core";
import NameTag from "../NameTag/NameTag";

const useStyles = createStyles((theme) => ({
  position: {
    position: "absolute",
    top: "95%",
    left: "48%",
    transform: "translateX(-50%) translateY(-50%)",
    overflow: "hidden",
  },
  area: {
    width: "900px",
    height: "135px",
    backgroundColor: `${theme.colors.red[4]}`,
    borderTopLeftRadius: "400px",
    borderTopRightRadius: "400px",
    borderBottom: "0",
    boxSizing: "border-box",
  },
  text: {
    position: "absolute",
    top: "5%",
    left: "45%",
    color: "black",
  },
}));

function PlayerHand({ player }) {
  //console.log(player);
  const { classes } = useStyles();
  return (
    <div className={classes.position}>
      <div className={classes.area}>
        <Text size="xl" className={classes.text}>
          {player ? player.name : "PlayerHand"}
        </Text>
        <NameTag />
      </div>
      {
        //display player card here
      }
    </div>
  );
  //return that players cards and nametag
}

export default PlayerHand;
