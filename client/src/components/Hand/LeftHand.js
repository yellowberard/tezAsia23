import React from "react";
import { createStyles, Text } from "@mantine/core";
import NameTag from "../NameTag/NameTag";

const useStyles = createStyles((theme) => ({
  position: {
    position: "absolute",
    top: "48%",
    left: "3%",
    transform: "translateX(-50%) translateY(-50%) rotate(90deg)",
  },
  area: {
    width: "800px",
    height: "125px",
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
  tag: {
    position: "absolute",
    top: "15%",
    left: "5%",
    transform: "translateX(-50%) translateY(-50%) rotate(270deg)",
  },
}));

function LeftHand({ player }) {
  const { classes } = useStyles();
  return (
    <div className={classes.position}>
      <div className={classes.area}>
        <Text size="xl" className={classes.text}>
          {player ? player.name : "LeftHand"}
        </Text>
      </div>
      <div className={classes.tag}>
        <NameTag playerName={player.name} />
      </div>
      {
        //display player card here
      }
    </div>
  ); //change "LeftHand to "" {empty string}"
  //return that players card and nametag
}

export default LeftHand;
