import { useEffect, useState } from "react";
import { createStyles, Text } from "@mantine/core";
import NameTag from "../NameTag/NameTag";
import Card from "../Card/Card";

const useStyles = createStyles((theme) => ({
  position: {
    position: "absolute",
    top: "48%",
    left: "3%",
    transform: "translateX(-50%) translateY(-50%) rotate(90deg)",
  },
  area: {
    width: "870px",
    height: "125px",
    backgroundColor: `${theme.colors.red[4]}`,
    borderTopLeftRadius: "400px",
    borderTopRightRadius: "400px",
    borderBottom: "0",
    boxSizing: "border-box",

    "@media (max-width:2000px)": {
      width: "800px",
      height: "125px",
    },
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

    "@media (max-width:2000px)": {
      top: "6%",
      left: "93.7%",
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
    "@media (max-width:2000px)": {
      marginLeft: "-3rem",
      "&:not(:first-of-type)": {
        marginLeft: "-6.75rem",
      },
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

function LeftHand({ player }) {
  const { classes } = useStyles();
  //console.log(player);
  const [cardsLength, setCardLength] = useState(0);

  useEffect(() => {
    setCardLength(player.hand.length);
  }, [player.hand.length]);

  return (
    <div className={classes.position}>
      <div className={classes.area}>
        {/*  <Text size="xl" className={classes.text}>
          {player ? player.name : "LeftHand"}
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
    </div>
  ); //change "LeftHand to "" {empty string}"
  //return that players card and nametag
}

export default LeftHand;
