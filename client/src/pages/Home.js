import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import {
  useMantineTheme,
  Popover,
  Button,
  Group,
  createStyles,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
/* import Player from "../classes/Player";
//import GameState from "../classes/GameState";
import Deck from "../classes/Deck";
import { getRandomAvatar } from "../utils"; */

import { useDispatch } from "react-redux";
import { reset } from "../feature/gameSlice";

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

  const theme = useMantineTheme();

  const query = useMediaQuery("(max-width: 719px)");
  const dispatch = useDispatch();

  const [opened, setOpened] = useState(false);

  function handleClickToGame() {
    /*    let player1 = new Player("1234", "player1", "jd3jds");
    // let card1 = deck.removeCard();
    // player1.addCardToHand(card1);
    //player1.addCardToHand(deck.removeCard());
    //player1.removeCardFromHand(card1.getCardID);
    //console.log(player1);

    //shuffle players before pushing to redux
    let player2 = new Player("1789", "player2", "jd3jds");
    let player3 = new Player("30489", "player3", "jd3jds");
    let player4 = new Player("313569", "player4", "jd3jds");

    let deck = new Deck();

    let avatarList = getRandomAvatar();

    //find way to create multiple json objects based for players below
    let players = [
      {
        id: player1.id,
        name: player1.name,
        room: player1.room,
        hand: player1.hand,
        avatarID: avatarList[0],
      },
      {
        id: player2.id,
        name: player2.name,
        room: player2.room,
        hand: player2.hand,
        avatarID: avatarList[1],
      },
      /*  {
        id: player3.id,
        name: player3.name,
        room: player3.room,
        hand: player3.hand,
        avatarID: avatarList[2],
      },
      {
        id: player4.id,
        name: player4.name,
        room: player4.room,
        hand: player4.hand,
        avatarID: avatarList[3],
      }, 
    ]; 

    dispatch(
      start({
        players: players,
        deck: deck.getDeck(),
        //topCard: deck.removeCard(),
      })
    ); */

    navigate("/Create");
  }

  useEffect(() => {
    dispatch(reset());
  }, [dispatch, navigate]);

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
            onClick={() => navigate("/Create")}
          >
            Create Game
          </Button>

          <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            target={
              <Button
                color="dark"
                radius="md"
                size={query ? "lg" : "xl"}
                onClick={() => setOpened((o) => !o)}
              >
                Join Game
              </Button>
            }
            shadow="xl"
            width={260}
            position="bottom"
            withArrow
            styles={{
              body: {
                backgroundColor: theme.colors.dark[8],
              },
            }}
          >
            <Group position="center">
              <Button
                size={query ? "sm" : "md"}
                radius="md"
                color="gray"
                onClick={() => navigate("/JoinPrivate")}
              >
                Private Game
              </Button>

              <Button
                size={query ? "sm" : "md"}
                radius="md"
                color="gray"
                onClick={() => navigate("/JoinPublic")}
              >
                Public Game
              </Button>
            </Group>
          </Popover>
        </Group>
      </Group>
      <Background />
    </>
  );
}

export default Home;
