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

  joinRoom({ socket, name, password }) {
    if (this.players.length >= this.maxPlayers) {
      return { status: "failure", error: "room is full." };
    } else if (
      (this.publicGameCheck === "public" || this.password === password) &&
      !this.gamestate.gameStart
    ) {
      const player = this.createPlayer({ id: socket.id, name: name });
      this.players.push(player);
      socket.join(this.roomID);

      return { status: "success", error: "none" };
    } else {
      const error = this.gamestate.gameStart
        ? "uno game has already started"
        : "password not correct.";

      return { status: "failure", error: error };
    }
  }

  leaveRoom(socket, type = "") {
    //remove the leaving player's cards and add to deck
    if (type === "in_game") {
      console.log(this.gamestate.getDeck().length);
      const player = this.players.find((player) => player.id === socket.id);
      console.log(player);
      for (let i = 0; i < player.hand.length; i++) {
        this.gamestate.deck.push(player.hand.pop());
      }
      console.log(this.gamestate.getDeck().length);
      socket.to(this.roomID).emit("update_deck", this.gamestate.getDeck());
    }
    this.players = this.players.filter((player) => player.id !== socket.id);
    socket.leave(this.roomID);
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
