import React, { useEffect, useState } from "react";
import {
  useMantineTheme,
  Popover,
  Button,
  Group,
  createStyles,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { InfoCircle, PlayCard } from "tabler-icons-react";

import { useDispatch } from "react-redux";
import { reset } from "../feature/gameSlice";
import { resetChat } from "../feature/chatSlice";

import Background from "../components/Background/Background";
import logo from "../assets/logo.png";
import Credits from "../components/Credits/Credits";

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
  infoButton: {
    position: "absolute",
    top: "5%",
    left: "5%",
  },
  rulesButton: {
    position: "absolute",
    top: "5%",
    left: "85%",
  },
}));

function Home() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const theme = useMantineTheme();

  const query = useMediaQuery("(max-width: 719px)");
  const dispatch = useDispatch();

  const [opened, setOpened] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  useEffect(() => {
    dispatch(reset());
    dispatch(resetChat());
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

      <Tooltip
        className={classes.infoButton}
        position="top"
        placement="center"
        withArrow
        label="Credits"
      >
        <ActionIcon
          color="dark"
          radius="xl"
          variant="filled"
          onClick={() => setOpenInfo(true)}
        >
          <InfoCircle size={75} />
        </ActionIcon>
      </Tooltip>

      <Credits openInfo={openInfo} setOpenInfo={setOpenInfo} />

      <Tooltip
        className={classes.rulesButton}
        position="top"
        placement="center"
        withArrow
        label="Learn how to play"
      >
        <ActionIcon
          component="a"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.unorules.org/wp-content/uploads/2021/03/Uno-Rules-PDF-Official-Rules-unorules.org_.pdf"
          color="dark"
          radius="xl"
          variant="filled"
        >
          <PlayCard size={50} />
        </ActionIcon>
      </Tooltip>

      <Background />
    </>
  );
}

export default Home;
