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
