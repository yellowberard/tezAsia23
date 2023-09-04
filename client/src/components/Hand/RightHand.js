import { useEffect, useState } from "react";
import { createStyles } from "@mantine/core";
import React from 'react'

import NameTag from "../NameTag/NameTag";
import Card from "../Card/Card";

const useStyles = createStyles((theme) => ({
  position: {
    position: "absolute",
    top: "48%",
    left: "96.6%",
    transform: "translateX(-50%) translateY(-50%) rotate(270deg)",
  },
  area: {
    width: "710px",
    height: "125px",
    backgroundColor: `${theme.colors.red[4]}`,
    borderTopLeftRadius: "400px",
    borderTopRightRadius: "400px",
    borderBottom: "0",
    boxSizing: "border-box",
    "@media (min-width: 180px) and (max-width: 299px)": {
      width: "370px",
      height: "100px",
    },

    "@media (min-width: 300px) and (max-width: 460px)": {
      width: "450px",
      height: "125px",
    },

    "@media (min-width: 461px) and (max-width: 676px)": {
      width: "600px",
      height: "125px",
    },
    "@media (min-width: 677px) and (max-width: 820px)": {
      width: "600px",
      height: "125px",
    },

    "@media (min-width: 821px) and (max-width: 1300px)": {
      width: "700px",
      height: "125px",
    },
    "@media screen and (orientation: landscape) and (max-device-width: 930px)":
      {
        width: "400px",
        height: "125px",
      },
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
    top: "20%",
    left: "95%",
    transform: "translateX(-50%) translateY(-50%) rotate(90deg)",

    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      top: "25%",
      left: "87%",
    },
    "@media (min-width: 577px) and (max-width: 884px)": {
      top: "25%",
      left: "97%",
    },
    "@media screen and (orientation: landscape) and (max-device-width: 930px)":
      {
        top: "28%",
        left: "89%",
      },
  },
  cards: {
    display: "flex",
    position: "absolute",
    top: "20%",
    left: "13%",
  },
  lessCard: {
    marginLeft: "-3.3rem",

    "&:not(:first-of-type)": {
      marginLeft: "-7rem",
    },

    "@media (min-width: 180px) and (max-width: 299px)": {
      marginLeft: "-0.2rem",

      "&:not(:first-of-type)": {
        marginLeft: "-3.6rem",
      },
    },
    "@media (min-width: 300px) and (max-width: 460px)": {
      marginLeft: "-1rem",
      "&:not(:first-of-type)": {
        marginLeft: "-5.1rem",
      },
    },

    "@media (min-width: 461px) and (max-width: 575px)": {
      marginLeft: "-1.9rem",
      "&:not(:first-of-type)": {
        marginLeft: "-4.5rem",
      },
    },
    "@media (min-width: 576px) and (max-width: 793px)": {
      marginLeft: "-2.5rem",
      "&:not(:first-of-type)": {
        marginLeft: "-7.5rem",
      },
    },

    "@media (min-width: 794px) and (max-width: 819px)": {
      marginLeft: "-2rem",
      "&:not(:first-of-type)": {
        marginLeft: "-7.7rem",
      },
    },
    "@media (min-width: 820px) and (max-width: 1199px)": {
      marginLeft: "-3rem",
      "&:not(:first-of-type)": {
        marginLeft: "-7.28rem",
      },
    },

    "@media (min-width: 1200px) and (max-width: 1300px)": {
      marginLeft: "-3rem",
      "&:not(:first-of-type)": {
        marginLeft: "-7.1rem",
      },
    },
    "@media screen and (orientation: landscape) and (max-device-width: 930px)":
      {
        marginLeft: "-1rem",
        "&:not(:first-of-type)": {
          marginLeft: "-7.3rem",
        },
      },
  },

  moreCard: {
    marginLeft: "-3rem",
    "&:not(:first-of-type)": {
      marginLeft: "-7.6rem",
    },
    "@media (min-width: 180px) and (max-width: 299px)": {
      marginLeft: "-0rem",

      "&:not(:first-of-type)": {
        marginLeft: "-3.9rem",
      },
    },

    "@media (min-width: 300px) and (max-width: 575px)": {
      marginLeft: "-1rem",
      "&:not(:first-of-type)": {
        marginLeft: "-5.6rem",
      },
    },

    "@media (min-width: 576px) and (max-width: 700px)": {
      marginLeft: "-1.3rem",
      "&:not(:first-of-type)": {
        marginLeft: "-8rem",
      },
    },
    "@media (min-width: 701px) and (max-width: 819px)": {
      marginLeft: "-2rem",
      "&:not(:first-of-type)": {
        marginLeft: "-7.9rem",
      },
    },

    "@media (min-width: 820px) and (max-width: 1100px)": {
      marginLeft: "-3rem",
      "&:not(:first-of-type)": {
        marginLeft: "-7.77rem",
      },
    },
    "@media (min-width: 1200px) and (max-width: 1300px)": {
      marginLeft: "-3.2rem",
    },
    "@media screen and (orientation: landscape) and (max-device-width: 930px)":
      {
        marginLeft: "-8rem",
      },
  },
}));

function RightHand({ player }) {
  const [cardsLength, setCardLength] = useState(0);

  useEffect(() => {
    setCardLength(player.hand.length);
  }, [player.hand.length]);

  const { classes } = useStyles();
  return (
    <div className={classes.position}>
      <div className={classes.area}></div>
      <div className={classes.tag}>
        <NameTag
          playerName={player.name}
          playerID={player.id}
          id={player.avatarID}
        />
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
              <Card
                key={card.id}
                card={card}
                playerID={player.id}
                back={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RightHand;
