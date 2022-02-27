import { createSlice, current } from "@reduxjs/toolkit";
import {
  switchPlayers,
  switchTwoPlayerGame,
  removeCardFromHand,
} from "../utils/gameLogicUtil";

const initialState = {
  players: [],
  deck: [],
  discard: [],
  currentPlayer: 0,
  nextPlayer: 1,
  playerID: "",
  direction: "forward",
  TopCard: {},
  currentColor: "",
  currentType: "",
  isWild: false,
  isColorChosen: false,
  isWin: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start(state, action) {
      action.payload.deck.forEach((card) => {
        state.deck.push(card);
      });

      let randomId;
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
    },

    removePlayer(state, action) {
      //if player disconnects or leaves game
    },

    draw(state, action) {
      //, action) {
      // draw from deck and add to player hand

      if (state.deck.length >= 8) {
        //move cards in discard except topCard to deckpile and shuffle again
      }

      state.deck.pop();
    },

    move(state, action) {
      let currPlayerIndex = state.currentPlayer;
      let nextPlayerIndex = state.nextPlayer;

      const playedPlayerID = action.payload.player;
      const playerLength = state.players.length;

      const cardPlayed = action.payload.card;
      const topcard = state.TopCard;
      const currentPlayer = state.players[currPlayerIndex];
      const cardGameInfo = {
        currentPlayer: currentPlayer,
        cardPlayed: cardPlayed,
      };

      if (state.deck.length >= 8) {
        //move cards in discard except topCard to deckpile and shuffle again
      }

      if (currentPlayer.id === playedPlayerID) {
        if (
          cardPlayed.color === state.currentColor || //convert to function : FIX
          cardPlayed.color === topcard.color ||
          cardPlayed.name === topcard.name
        ) {
          //convert to function : FIX

          switch (cardPlayed.type) {
            case "reverse":
              //convert to function: FIX
              state.currentType = "reverse";

              if (state.direction === "forward") {
                state.direction = "reverse";
                break;
              } else {
                state.direction = "forward";
                break;
              }

            case "skip":
              state.currentType = "skip";
              break;

            case "draw":
              state.currentType = "draw";

              for (let i = 0; i < 2; i++) {
                state.players[state.nextPlayer].hand.push(state.deck.pop());
              }
              break;

            default:
              state.currentType = "normal";
              break;
          }
          const playerGameInfo = {
            direction: state.direction,
            currPlayerIndex: currPlayerIndex,
            nextPlayerIndex: nextPlayerIndex,
            playerLength: playerLength,
            currentType: state.currentType,
          };

          [currPlayerIndex, nextPlayerIndex] =
            playerLength === 2
              ? switchTwoPlayerGame(playerGameInfo)
              : switchPlayers(playerGameInfo);

          state.currentPlayer = currPlayerIndex;
          state.nextPlayer = nextPlayerIndex;

          state.isColorChosen = false;
          currentPlayer.hand = removeCardFromHand(cardGameInfo);

          state.TopCard = cardPlayed;
          state.discard = [...state.discard, cardPlayed];
          state.currentColor = state.TopCard.color;

          //check for Wild4 and Wild card but do not chnage state.currentPlayer until current player chooses a new card color
        } else if (
          cardPlayed.name === "Wild4card" ||
          cardPlayed.name === "Wildcard"
        ) {
          switch (cardPlayed.type) {
            case "Wild4":
              state.currentType = "Wild4";
              for (let i = 0; i < 4; i++) {
                state.players[state.nextPlayer].hand.push(state.deck.pop());
              }
              break;
            case "Wild":
              state.currentType = "Wild";
              break;
            default:
              break;
          }
          currentPlayer.hand = removeCardFromHand(cardGameInfo);
          state.TopCard = cardPlayed;
          state.discard = [...state.discard, cardPlayed];
        }
      }
    },

    Win(state, action) {},

    setWildCard(state, action) {
      state.isWild = action.payload;
    },

    setColorChosen(state, action) {
      state.isColorChosen = action.payload;
    },

    //called when wild card is placed after player has chosen a color
    //switch player after setting current color
    colorChange(state, action) {
      let currPlayerIndex = state.currentPlayer;
      let nextPlayerIndex = state.nextPlayer;
      const playerLength = state.players.length;
      const playerGameInfo = {
        direction: state.direction,
        currPlayerIndex: currPlayerIndex,
        nextPlayerIndex: nextPlayerIndex,
        playerLength: playerLength,
        currentType: state.currentType,
      };
      state.isColorChosen = true;
      state.currentColor = action.payload;

      [currPlayerIndex, nextPlayerIndex] =
        playerLength === 2
          ? switchTwoPlayerGame(playerGameInfo)
          : switchPlayers(playerGameInfo);

      state.currentPlayer = currPlayerIndex;
      state.nextPlayer = nextPlayerIndex;
    },

    reset() {
      return initialState;
    },
  },
});

export const {
  start,
  draw,
  reset,
  move,
  setWildCard,
  colorChange,
  setColorChosen,
} = gameSlice.actions;
export default gameSlice.reducer;
