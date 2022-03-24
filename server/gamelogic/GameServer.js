const { v4 } = require("uuid");

class GameServer {
  constructor({ room, maxPlayers, password, publicGameCheck, gamestate }) {
    this.roomID = v4().substring(0, 16);
    this.roomName = room;
    this.maxPlayers = Number(maxPlayers);
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
    if (this.players.length >= this.maxPlayers) {
      console.log("room is full");
      return { status: "failure", player: "", error: "room is full." };
    } else if (
      (this.publicGameCheck === "public" || this.password === password) &&
      !this.gamestate.gameStart
    ) {
      //console.log(socket.id + " Joined " + this.roomID);
      console.log(" before joined length: ", this.players.length);

      const player = this.createPlayer({ id: socket.id, name: name });
      this.players.push(player);
      console.log("joined length: ", this.players.length);

      socket.join(this.roomID);
      return { status: "success", player: player, error: "none" };
    } else {
      const error = this.gamestate.gameStart
        ? "uno game has already started"
        : "password not correct.";
      return { status: "failure", player: "", error: error };
    }

    //const newPlayer = createPlayer(socket.id)
    //add player to this.players list
    //add socket to room
  }

  startGame() {
    //players: players,
    //deck: deck.getDeck(),
    //topCard: deck.removeCard(),
    action.payload.deck.forEach((card) => {
      state.deck.push(card);
    });

    /*    let randomId;
      while (true) {
        randomId = Math.floor(Math.random() * state.deck.length);
        if (
          state.deck[randomId].type === "Wild" ||
          state.deck[randomId].type === "Wild4" ||
          state.deck[randomId].type === "draw" ||
          state.deck[randomId].type === "reverse" ||
          state.deck[randomId].type === "skip"
        ) {
          continue;
        } else {
          break;
        }
      }

      let topCard = state.deck.splice(randomId, 1)[0];
      state.TopCard = topCard;
      state.currentColor = state.TopCard.color;

      action.payload.players.forEach((player) => {
        for (let i = 0; i < 7; i++) {
          player.hand.push(state.deck.pop());
        }
        state.players.push(player);
      });

      state.discard.push(topCard);
    }, */
  }
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
