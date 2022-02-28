import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useMantineTheme,
  Modal,
  Button,
  Space,
  Center,
  Text,
  Group,
  createStyles,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { getWinnerScore } from "../../utils/gameLogicUtil";
import NameTag from "../NameTag/NameTag";
import logo from "../../assets/logo.png";

const useStyles = createStyles((theme) => ({
  img: {
    height: "70px",
    width: "70px",
  },
}));

function Win() {
  const [opened, setOpened] = useState(true);
  const [score, setScore] = useState(0);
  const winner = useSelector((state) => state.game.winner);
  const players = useSelector((state) => state.game.players);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { classes } = useStyles();

  function handleClick() {
    navigate("/");
  }

  useEffect(() => {
    setScore(getWinnerScore(players));
  }, [players]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(true)}
        //title="CONGRAULATIONS!!!"
        hideCloseButton
        styles={{
          title: { color: `${theme.colors.blue[8]}`, fontWeight: "bold" },
          modal: {
            backgroundColor: `${theme.colors.red[8]}`,
            border: `5px solid ${theme.colors.dark[8]}`,
          },
        }}
      >
        <Center>
          <Group position="center" direction="column">
            <Text color={theme.colors.yellow[2]} size="xl" weight={800}>
              WINNER!
            </Text>
            <NameTag id={winner.avatarID} />
            {
              //add winner player score here (winner score -> add up all the remaining cards from other players)
            }
            <Text color={theme.colors.blue[2]} size="xl" weight={800}>
              Score:{" "}
              <span
                style={{
                  color: `${theme.colors.dark[9]}`,
                  textDecoration: "underline",
                }}
              >
                {score}{" "}
              </span>
            </Text>

            <Text color="dark" weight={700} size="lg">
              <span
                style={{
                  color: `${theme.colors.gray[0]}`,
                  textDecoration: "underline",
                }}
              >
                {winner.name}
              </span>{" "}
              has won{" "}
              <img src={logo} alt="Uno Game Logo" className={classes.img} />
            </Text>
          </Group>
        </Center>
        <Space h="lg" />
        <Center>
          <Button color="blue" radius="xs" onClick={handleClick}>
            End Game
          </Button>
        </Center>
      </Modal>
    </>
  );
}

export default Win;
