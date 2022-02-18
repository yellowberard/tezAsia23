import React, { useEffect } from "react";
import Background from "../components/Background";
import { Button, Group, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import Player from "../classes/Player";
//import GameState from "../classes/GameState";
import { useDispatch } from "react-redux";
import { reset, start } from "../feature/gameSlice";
import { persistor } from "../app/store";
import logo from "../assets/logo.png";
import Deck from "../classes/Deck";

const useStyles = createStyles((theme) => ({
  img: {
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      height: "350px",
      width: "350px",
    },

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      height: "465px",
      width: "465px",
    },

    "@media (max-width: 375px)": {
      height: "260px",
      width: "260px",
    },
  },
}));

function Home() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const query = useMediaQuery("(max-width: 719px)");
  const dispatch = useDispatch();

  function handleClickToGame() {
    let player1 = new Player("1234", "player1", "jd3jds");
    // let card1 = deck.removeCard();
    // player1.addCardToHand(card1);
    //player1.addCardToHand(deck.removeCard());
    //player1.removeCardFromHand(card1.getCardID);
    //console.log(player1);
    let player2 = new Player("1789", "player2", "jd3jds");
    let player3 = new Player("30489", "player3", "jd3jds");
    let player4 = new Player("313569", "player4", "jd3jds");

    let deck = new Deck();

    //find way to create multiple json objects based for players below
    let players = [
      {
        id: player1.id,
        name: player1.name,
        room: player1.room,
        hand: player1.hand,
      },
      {
        id: player2.id,
        name: player2.name,
        room: player2.room,
        hand: player2.hand,
      },
      {
        id: player3.id,
        name: player3.name,
        room: player3.room,
        hand: player3.hand,
      },
      {
        id: player4.id,
        name: player4.name,
        room: player4.room,
        hand: player4.hand,
      },
    ];

    dispatch(
      start({
        players: players,
        deck: deck.getDeck(),
        //topCard: deck.removeCard(),
      })
    );

    navigate("/Game");
  }

  useEffect(() => {
    //window.onpopstate = (e) => {
    // okay for right now, also if player disconnects from game (reset and remove player)

    dispatch(reset());
    persistor.purge();
    console.log(localStorage);
  }, [dispatch]);

  return (
    <>
      <Group position="center" direction="column" spacing="xl">
        <img src={logo} alt="Uno Game Logo" className={classes.img} />

        <Group
          position="center"
          direction={query ? "column" : "row"}
          spacing="xl"
        >
          <Button
            color="dark"
            radius="md"
            size={query ? "lg" : "xl"}
            onClick={handleClickToGame}
          >
            Create Game
          </Button>

          <Button color="dark" radius="md" size={query ? "lg" : "xl"}>
            Join Game
          </Button>
        </Group>
      </Group>

      <Background />
    </>
  );
}

export default Home;
