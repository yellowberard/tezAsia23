import React, { useState, useEffect } from "react";
import { createStyles, Text } from "@mantine/core";
import NameTag from "../NameTag/NameTag";
import Card from "../Card/Card";

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
    left: "108%",
    transform: "translateX(-50%) translateY(-50%) rotate(180deg)",
    "@media (max-width:2000px)": {
      top: "58%",
    },
  },
  cards: {
    display: "flex",
    position: "absolute",
    top: "20%",
    left: "13%",
  },
  lessCard: {
    marginLeft: "-2rem",

    "&:not(:first-of-type)": {
      marginLeft: "-6.2rem",
    },
    "&:hover": {
      transform: "translateY(-1rem)",
    },
  },

  moreCard: {
    marginLeft: "-2rem",
    "&:not(:first-of-type)": {
      marginLeft: "-7.6rem",
    },
    "&:hover": {
      transform: "translateY(-2rem)",
    },
  },
}));

function TopHand({ player }) {
  const [cardsLength, setCardLength] = useState(0);
  const { classes } = useStyles();

  useEffect(() => {
    setCardLength(player.hand.length);
  }, [player.hand.length]);

  return (
    <div className={classes.position}>
      <div className={classes.area}>
        {/*   <Text size="xl" className={classes.text}>
          {player ? player.name : "TopHand"}
        </Text> */}
      </div>
      <div className={classes.tag}>
        <NameTag playerName={player.name} id={player.avatarID} />
      </div>
      <div className={classes.cards}>
        {player.hand.map((card, index) => {
          return (
            <div
              key={index}
              className={
                cardsLength >= 16 ? classes.moreCard : classes.lessCard
              }
            >
              <Card key={card.id} card={card} playerID={player.id} />
            </div>
          );
        })}
      </div>
    </div> //change "TopHand to "" {empty string}"
  );
}

export default TopHand;
