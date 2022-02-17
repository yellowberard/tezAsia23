import React from "react";
import Background from "../components/Background";
import { Button, Group, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

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
            onClick={() => {
              navigate("/Game");
            }}
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
