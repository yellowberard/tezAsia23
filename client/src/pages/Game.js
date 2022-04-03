import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Pile from "../components/Pile/Pile";
import { useSelector, useDispatch } from "react-redux";

import {
  ActionIcon,
  Alert,
  Button,
  createStyles,
  Group,
  Loader,
  Modal,
  Text,
  useMantineTheme,
} from "@mantine/core";
import TopHand from "../components/Hand/TopHand";
import PlayerHand from "../components/Hand/PlayerHand";
import RightHand from "../components/Hand/RightHand";
import LeftHand from "../components/Hand/LeftHand";
import ColorChooser from "../components/ColorChooser/ColorChooser";
import Win from "../components/Win/Win";

import socket from "../app/socket";
import Exit from "../components/Exit/Exit";
import { updatePlayers } from "../feature/gameSlice";
import { DoorExit, LetterX } from "tabler-icons-react";
import Error from "../components/Error/Error";

const useStyles = createStyles((theme) => ({
  icon: {
    position: "absolute",
    top: "5%",
    left: "90%",
  },
}));

function Game() {
  const { id } = useParams();
  console.log(id);
  const { classes } = useStyles();

  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [found, setFound] = useState("");
  const [playerLeaveMessage, setPlayerLeaveMessage] = useState("");
  const [opened, setOpened] = useState(true);

  const playersList = useSelector((state) => state.game.players);
  const isWildCard = useSelector((state) => state.game.isWild);
  const isWin = useSelector((state) => state.game.isWin);

  const navigate = useNavigate();
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const positions = [TopHand, RightHand, LeftHand];

  useEffect(() => {
    // navigate back

    window.onpopstate = function () {
      socket.emit("leave_game_room", id);
      navigate("/", { replace: true });
    };
    window.history.pushState({}, "");

    window.onbeforeunload = (e) => {
      if (found) {
        socket.emit("leave_game_room", id);
      }
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, [found, id, navigate]);

  useEffect(() => {
    socket.on("game_end_error", (message) => {
      setMessage(message);
    });

    socket.on("game_room_user_leave", ({ message, playerID }) => {
      setPlayerLeaveMessage(message);
      dispatch(updatePlayers({ id: playerID }));
    });
  }, [dispatch]);

  useEffect(() => {
    setFound(playersList.find((player) => player.id === socket.id));
    const timer = setTimeout(() => setLoading(false), 50);

    return () => {
      setFound("");
      clearTimeout(timer);
    };
  }, [playersList]);

  function handleLeaveGame() {
    socket.emit("leave_game", id);
    navigate("/", { replace: true });
  }

  return (
    <div
      style={{
        margin: "0px",
        padding: "0px",
        height: "100vh",
        width: "100%",
        position: "absolute",
        bottom: "0",
        overflow: "hidden",
        backgroundSize: "100%",

        background: `radial-gradient(circle at center, ${theme.colors.orange[8]}, ${theme.colors.red[8]}, ${theme.colors.red[8]})`,
      }}
    >
      {isLoading ? (
        <Loader color="indigo" />
      ) : found ? (
        <div>
          <Pile />
          {playersList.map((player) => {
            if (player.id === socket.id) {
              return <PlayerHand key={player.id} player={player} />;
            }

            return positions.splice(0, 1).map((Component) => {
              return <Component key={player.id} player={player} />;
            });
          })}
          {isWildCard && <ColorChooser />}
          {isWin && <Win />}
          {message && (
            <Modal
              opened={opened}
              onClose={() => setOpened(true)}
              title="Game Error"
              hideCloseButton
              styles={{
                title: {
                  color: `${theme.colors.yellow[5]}`,
                },
                modal: {
                  backgroundColor: `${theme.colors.violet[8]}`,
                },
                body: {
                  color: `${theme.colors.gray[0]}`,
                },
              }}
            >
              <Group position="center">
                <Text>{message}</Text>
                <Button color="dark" onClick={handleLeaveGame}>
                  Exit Game
                </Button>
              </Group>
            </Modal>
          )}
          {playerLeaveMessage && (
            <Alert
              icon={<DoorExit size={16} />}
              radius="md"
              title="Player Left!"
            >
              <ActionIcon
                className={classes.icon}
                onClick={() => setPlayerLeaveMessage("")}
              >
                <LetterX size={13} />
              </ActionIcon>
              {playerLeaveMessage}
            </Alert>
          )}
          <Exit />
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Game;
