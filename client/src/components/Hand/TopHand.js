import React from "react";
import { createStyles, Text } from "@mantine/core";
import NameTag from "../NameTag/NameTag";

const useStyles = createStyles((theme) => ({
  position: {
    position: "absolute",
    top: "5%",
    left: "48%",
    transform: "translateX(-50%) translateY(-50%) rotate(180deg)",
  },
  area: {
    width: "900px",
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
    transform: "rotate(180deg)",
  },
  tag: {
    position: "absolute",
    top: "67%",
    left: "98%",
    transform: "translateX(-50%) translateY(-50%) rotate(180deg)",
  },
}));

function TopHand({ player }) {
  //console.log(player);
  const { classes } = useStyles();
  return (
    <div className={classes.position}>
      <div className={classes.area}>
        <Text size="xl" className={classes.text}>
          {player ? player.name : "TopHand"}
        </Text>
      </div>
      <div className={classes.tag}>
        <NameTag playerName={player.name} />
      </div>
      {
        //display player card here
      }
    </div> //change "TopHand to "" {empty string}"
  );
}

export default TopHand;
