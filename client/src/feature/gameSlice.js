import { createSlice, current } from "@reduxjs/toolkit";

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
  isWin: false,
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
      const playerPlayedID = action.payload.player;
      let currPlayer = state.currentPlayer;
      let nextPlayer = state.nextPlayer;
      const playerLength = state.players.length;

      const playerIndex = state.players.findIndex(
        (player) => player.id === playerPlayedID
      );
      const cardPlayed = action.payload.card;
      const topcard = state.TopCard;
      const currentPlayer = state.players[state.currentPlayer];

      //filters out the card out of the player's array
      if (currentPlayer.id === playerPlayedID) {
        if (
          cardPlayed.color === state.currentColor || //convert to function : FIX
          cardPlayed.color === topcard.color ||
          cardPlayed.name === topcard.name
        ) {
          //convert to function : FIX
          switch (cardPlayed.type) {
            case "reverse":
              //convert to function: FIX
              if (state.players.length === 2) {
                currPlayer = state.currentPlayer;
              } else {
                if (state.direction === "forward") {
                  state.direction = "reverse";
                  currPlayer = (currPlayer - 1 + playerLength) % playerLength;
                  console.log("current player: ", currPlayer);
                  //console.log(state.currentPlayer);
                } else {
                  state.direction = "forward";
                  currPlayer = (currPlayer + 1) % playerLength;
                }
              }

              break;

            /*  case "skip":
              if (state.players.length === 2) {
                currPlayer = state.currentPlayer;
              } else{

              } */

            case "draw":
              for (let i = 0; i < 2; i++) {
                state.players[state.nextPlayer].hand.push(state.deck.pop());
              }
              //switch player and next player function
              if (state.direction === "forward") {
                state.direction = "reverse";
                currPlayer = (currPlayer - 1 + playerLength) % playerLength;
                console.log("current player: ", currPlayer);
                break;
                //console.log(state.currentPlayer);
              } else {
                state.direction = "forward";
                currPlayer = (currPlayer + 1) % playerLength;
                break;
              }

            default:
              currPlayer = (currPlayer + 1) % playerLength;
              nextPlayer = (nextPlayer + 1) % playerLength;
              console.log(currPlayer);
              console.log("next player: ", nextPlayer);
          }

          console.log(current(state.players[playerIndex].hand));
          const newPlayerHand = state.players[playerIndex].hand.filter(
            (card) => card.id !== cardPlayed.id
          );

          state.players[playerIndex].hand = newPlayerHand;
          state.TopCard = cardPlayed;
          state.currentPlayer = currPlayer;
          state.nextPlayer = nextPlayer;
          //console.log(state.currentPlayer);
          //(state.currentPlayer + 1) % state.players.length;
          //state.nextPlayer = (state.nextPlayer + 1) % state.players.length;
          /*    } else if (cardPlayed.type === "wild") {
          if (cardPlayed.name === "Wild4card") {
            for (let i = 0; i < 4; i++) {
              state.players[state.nextPlayer].hand.push(state.deck.pop());
            }
            state.currentPlayer =
              (state.currentPlayer + 1) % state.players.length;
            state.nextPlayer = state.currentPlayer++;
          } 
        } */
        }

        //console.log(state.nextPlayer);
      }

      //check if current player == playerPlayedID then:
      // if (currentPlayer.id === playerPlayedID) {

      //check if cardPlayed.color === currentColor or cardPlayed.name === topcard.name: -> inside if statement then check if it is a number, draw,skip,or reverse
      //if type is "number" (check if cardPlayed.color === topcard.color or cardPlayed.name === topcard.name) -> if so then play/remove card from player's hand
      //if type is "draw"
      //if type is "skip"
      //if type is "reverse"
      //if type is "draw" -> if wilddraw -> draw 4 cards from the deck
      //  }

      //state.players.map.hand.filter

      //check if the card matches either the color or type -> update players card and action,remove card from deck etc.,update topcard else do nothing
      //else do nothing
      // console.log(currentPlayer.id);
      //if(playerPlayedID === )
      //console.log(playerPlayedID);
      //console.log(cardPlayed);
    },

    Win(state, action) {},

    colorChange(state, action) {
      state.currentColor = action.payload;
      //called when wild card is placed after player has
      //switch player after setting current color
      //called in discard pile.js
    },

    reset() {
      return initialState;
    },
  },
});

export const { start, draw, reset, move } = gameSlice.actions;
export default gameSlice.reducer;
