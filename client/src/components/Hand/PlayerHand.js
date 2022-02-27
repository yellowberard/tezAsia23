import { useEffect, useState } from "react";
import { createStyles, Grid, Text } from "@mantine/core";
import NameTag from "../NameTag/NameTag";
import Card from "../Card/Card";

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
    height: "145px",
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

function PlayerHand({ player }) {
  //console.log(player);
  const [cardsLength, setCardLength] = useState(0);

  useEffect(() => {
    if (cardsLength === 0) {
    }
    setCardLength(player.hand.length);
  }, [cardsLength, player.hand.length]);

  const { classes } = useStyles();
  return (
    <div className={classes.position}>
      <div className={classes.area}>
        {/*  <Text size="xl" className={classes.text}>
          {player ? player.name : "PlayerHand"}
        </Text> */}
        <NameTag playerID={player.id} id={player.avatarID} />
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
    </div>
  );
  //return that players cards and nametag
}

export default PlayerHand;
