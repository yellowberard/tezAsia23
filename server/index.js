const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const GameServer = require("./gamelogic/GameServer");
const GameState = require("./gamelogic/GameState");
const { v4 } = require("uuid");
const { Console } = require("console");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const games = new Map();

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on(
    "create_game",
    ({ room, name, maxPlayers, publicGameCheck, password }, callback) => {
      //create gamestate to keep state of uno game
      const gamestate = new GameState();
      const roomInfo = {
        room: room,
        maxPlayers: maxPlayers,
        password: password,
        publicGameCheck: publicGameCheck,
        gamestate: gamestate,
      };

      //create new server connection
      const newServer = new GameServer(roomInfo);

      const { status, error } = newServer.joinRoom({
        socket: socket,
        name: name,
        password: password,
      });

      games.set(newServer.roomID, newServer);

      if (status === "success") {
        if (publicGameCheck === "public") {
          const data = {
            roomName: newServer.roomName,
            maxPlayers: newServer.maxPlayers,
            player: newServer.players[0],
          };
          socket.emit("public_game_created", newServer.roomID);
        } else {
          socket.emit("private_game_created", newServer.roomID);
        }
      } else {
        //display error to client
        socket.emit("error_join", error);
      }

      //console.log(socket.id + " Joined " + newServer.roomID);
    }
  );

  socket.on("join_room", ({ room, name, password }) => {
    const gameServer = games.get(room);

    if (gameServer) {
      const { status, error } = gameServer.joinRoom({
        socket: socket,
        name: name,
        password: password,
      });

      if (status === "success") {
        socket.emit("join_success", gameServer.roomID);
        socket.to(gameServer.roomID).emit("player_join", gameServer.players);

        if (gameServer.maxPlayers === gameServer.players.length) {
          console.log("game begin");
          //set up start game
          //const { } = gameServer.startGame()

          const startGameInfo = {
            players: gameServer.players,
            deck: gameServer.gamestate.getDeck(),
          };

          io.in(gameServer.roomID).emit("start_game", startGameInfo);
        }
      } else {
        socket.emit("join_error", error);
      }
    } else {
      socket.emit("join_error", "room code does not exist.");
    }
  });

  //when either a player creates a game and or joins the waiting room for the first time
  socket.on("initial_wait", (roomID, callback) => {
    const server = games.get(roomID);
    if (server) {
      callback({
        roomName: server.roomName,
        maxPlayers: server.maxPlayers,
        players: server.players,
      });
    }
  });

  socket.on("wait_room_leave", (roomID) => {
    const server = games.get(roomID);

    if (server) {
      if (server.players.length === 1) {
        socket.leave(roomID);
        games.delete(roomID);
      } else {
        const player = server.players.find((player) => player.id === socket.id);

        if (player) {
          const message = `Player: ${player.name} has left the game lobby.`;
          server.leaveRoom(socket);
          socket.to(roomID).emit("wait_room_user_leave", {
            message: message,
            newPlayersList: server.players,
          });
        }
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    console.log(socket.rooms);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
