import { createStyles, Loader } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, generatePath } from "react-router-dom";
import { useDispatch } from "react-redux";
import { start } from "../feature/gameSlice";

import Background from "../components/Background";
import socket from "../app/socket";
import Lobby from "../components/Lobby/Lobby";
import Error from "../components/Error/Error";

const useStyles = createStyles((theme) => ({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
  },
}));

function WaitRoom() {
  const { id } = useParams();
  const [waitingPlayers, setWaitingPlayers] = useState(0);
  const [found, setFound] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [roomName, setRoomName] = useState("");
  const [maxRoomLength, setMaxRoomLength] = useState(0);
  const [playersList, setPlayersList] = useState([]);
  const navigate = useNavigate();
  const { classes } = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    //get players length
    //get current players in room
    window.onpopstate = (e) => {
      //socket.emit("leave_game",{id})
      setLoading(true);
      navigate("/");
    };
    window.onbeforeunload = (e) => {
      console.log("refereshed");
      //socket.emit("leave_game", {id})
    };
  }, [navigate]);

  useEffect(() => {
    socket.emit("initial_wait", id, (response) => {
      if (response) {
        setRoomName(response.roomName);
        setMaxRoomLength(response.maxPlayers);
        setWaitingPlayers(response.players.length);
        setPlayersList(response.players);
      }
    });

    socket.on("player_join", (player) => {
      setWaitingPlayers((count) => count + 1);
      setPlayersList((players) => [...players, player]);
      //setError(false);
    });

    socket.on("start_game", (data) => {
      //

      /* dispatch(
      start({
        players: players,
        deck: deck.getDeck(),
        //topCard: deck.removeCard(),
      })
    ); */
      dispatch(start(data));
      const gameRoomPath = generatePath("/Game/gameroom=:id", {
        id: id,
      });

      const gameTimer = setTimeout(() => navigate(gameRoomPath), 1200);
      return () => {
        setFound("");
        clearTimeout(gameTimer);
      };
    });
  }, [dispatch, id, navigate]);

  useEffect(() => {
    setFound(playersList.find((player) => player.id === socket.id));
    const timer = setTimeout(() => setLoading(false), 50);
    return () => {
      setFound("");
      clearTimeout(timer);
    };
  }, [playersList]);

  return (
    <div>
      <div className={classes.container}>
        {isLoading ? (
          <Loader color="indigo" />
        ) : found ? (
          <Lobby
            roomName={roomName}
            playersList={playersList}
            waitingPlayers={waitingPlayers}
            maxRoomLength={maxRoomLength}
          />
        ) : (
          <Error setLoading={setLoading} />
        )}
      </div>
      <Background />
    </div>
  );
}

export default WaitRoom;
