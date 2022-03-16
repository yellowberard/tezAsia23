import { createStyles, Loader } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  useEffect(() => {
    //get players length
    //get current players in room
    window.onpopstate = (e) => {
      //socket.emit("leave_game",{roomName})
      setLoading(true);
      navigate("/");
    };
    window.onbeforeunload = (e) => {
      console.log("refereshed");
    };
  }, [navigate]);

  useEffect(() => {
    socket.emit("initial_wait", id, (response) => {
      setRoomName(response.roomName);
      setMaxRoomLength(response.maxPlayers);
      setWaitingPlayers(response.players.length);
      setPlayersList(response.players);
    });

    socket.on("player_join", (player) => {
      setWaitingPlayers((count) => count + 1);
      setPlayersList((players) => [...players, player]);
      //setError(false);
    });
  }, [id]);

  useEffect(() => {
    setFound(playersList.find((player) => player.id === socket.id));
    const timer = setTimeout(() => setLoading(false), 50);
    return () => {
      setFound("");
      //setLoading(true);
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
