const { v4 } = require("uuid");

class GameServer {
  constructor({ room, maxPlayers, password, publicGameCheck, gamestate }) {
    this.roomID = v4().substring(0, 16);
    this.roomName = room;
    this.maxPlayers = maxPlayers;
    this.password = password;
    this.publicGameCheck = publicGameCheck;
    this.gamestate = gamestate;
    this.players = [];
  }

  /* getRoomID() {
    return this.roomID;
  }

  getMaxPlayerCount() {
    return this.maxPlayers;
  }

  getRoomSize() {
    return this.players.length;
  } */
  //join player to room
  joinRoom({ socket, name, password }) {
    const player = this.createPlayer({ id: socket.id, name: name });

    if (this.players.length === this.maxPlayers) {
      console.log("room is full");
      return { status: "failure", player: "", error: "room is full." };
    }

    if (this.publicGameCheck === "public" || this.password === password) {
      //console.log(socket.id + " Joined " + this.roomID);
      this.players.push(player);
      //console.log(this.players);
      socket.join(this.roomID);
      return { status: "success", player: player, error: "none" };
    } else {
      return { status: "failure", player: "", error: "password not correct." };
    }

    //const newPlayer = createPlayer(socket.id)
    //add player to this.players list
    //add socket to room
  }

  addPlayerToRoom(player) {
    this.players.push(player);
  }
  /*   getPlayers() {
    return this.players;
  } */
  //remove player from room
  leaveRoom({ socket }) {
    //find player.id  in players ands remove from players list
    //socket.leave(this.roomID)
  }

  createPlayer({ id, name }) {
    let avatarID = this.gamestate.getAvatarID();
    return {
      id: id,
      name: name,
      hand: [],
      avatarID: avatarID,
    };
  }
}
module.exports = GameServer;
