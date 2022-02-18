import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  players: [],
  deck: [],
  discard: [],

  currentPlayer: 0,
  nextPlayer: 0,
  playerID: "",
  direction: 1,
  TopCard: {},
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start(state, action) {
      //action.payload.players
      //action.payload.deck
      //action.payload.topCard
      // console.log(action.payload.players);

      action.payload.deck.forEach((card) => {
        state.deck.push(card);
      });

      let randomId;
      while (true) {
        randomId = Math.floor(Math.random() * state.deck.length);
        if (
          state.deck[randomId].type === "wild" ||
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

      action.payload.players.forEach((player) => {
        for (let i = 0; i < 7; i++) {
          player.hand.push(state.deck.pop());
        }
        state.players.push(player);
      });

      //console.log(typeof action.payload.topCard);
      //console.log(action.payload.topCard);

      //state.deck.push(action.payload.deck);

      //console.log(state.TopCard)

      state.discard.push(topCard);

      //add intial start up game here
      //add players playing
      //add 7 cards starting out
    },
    /* 
    addCard(state,action){
        //
    },

    removeCard(state,action){
        //
    }, */

    removePlayer(state, action) {
      //if player disconnects or leaves game
    },

    draw(state, action) {
      //, action) {
      // draw from deck and add to player hand
      console.log("before pop: ", current(state));
      state.deck.pop();
      console.log(current(state));
    },

    move(state, action) {
      //update players card and action
      //remove card from deck etc.
      //update topcard
      //determine nextPlayer (change direction etc.)
    },

    reset() {
      return initialState;
    },
  },
});

export const { start, draw, reset } = gameSlice.actions;
export default gameSlice.reducer;
