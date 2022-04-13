const {
  switchTwoPlayerGame,
  switchPlayers,
  removeCardFromHand,
} = require("../gamelogic/gameLogicUtils");
const Deck = require("./Deck");

class GameState {
  constructor() {
    this.avatarIDList = [];
    this.currentPlayerIndex = 0; // current player's turn
    this.nextPlayerIndex = 1;
    this.currentColor = "";
    this.direction = "forward";
    this.currentType = "";
    this.deck = new Deck();
    this.topCard = {};
    this.isWild = false;
    this.discardPile = [];
    this.gameStart = false;
    this.players = [];
  }

  Win() {
    //determine win (if a player's card == 0) then they win
  }

  switchPlayers(type = "") {
    let currPlayerIndex = this.currentPlayerIndex;
    let nextPlayerIndex = this.nextPlayerIndex;
    let playerLength = this.players.length;

    console.log("maxPlayer: ", playerLength <= 2);
    const playerGameInfo = {
      direction: this.direction,
      currPlayerIndex: currPlayerIndex,
      nextPlayerIndex: nextPlayerIndex,
      playerLength: playerLength,
      currentType: type ? type : this.currentType,
    };

    console.log("length: ", playerLength);
    console.log("currPlayer: ", currPlayerIndex);
    console.log("nextPlayer: ", nextPlayerIndex);

    // switch player
    [currPlayerIndex, nextPlayerIndex] =
      playerLength <= 2
        ? switchTwoPlayerGame(playerGameInfo)
        : switchPlayers(playerGameInfo);

    /*   console.log("curr2: ", playerIndex);
    console.log("curr3: ", playerIndex[0]);
    console.log("curr4: ", playerIndex[1]); */

    this.currentPlayerIndex = currPlayerIndex;
    this.nextPlayerIndex = nextPlayerIndex;

    console.log("currPlayer2: ", this.currentPlayerIndex);
    console.log("nextPlayer2: ", this.nextPlayerIndex);
  }

  Move({ playerID, cardPlayed }) {
    //check if player can move card (if current turn) and if the card is a valid move or not
    //use removeFromDeck and switchPlayer, call players method (removeCardFromHand to get the remove card and set the Top card to that)
    //set Game State
    let currentPlayer = this.players[this.currentPlayerIndex];
    let playerLength = this.players.length;
    let currPlayerIndex = this.currentPlayerIndex;
    let nextPlayerIndex = this.nextPlayerIndex;
    let updatedNextPlayerHand = [];

    const cardGameInfo = {
      currentPlayer: currentPlayer,
      cardPlayed: cardPlayed,
    };

    if (this.deck.length <= 8) {
      //move cards in discard except topCard to deckpile and shuffle again
      console.log("deck is low in move");
    }
    /*  console.log("id: ", currentPlayer.id);
    console.log("id2: ", playerID); */
    if (currentPlayer.id === playerID) {
      console.log("hello1");
      if (
        cardPlayed.color === this.currentColor || //convert to function : FIX
        cardPlayed.color === this.topCard.color ||
        cardPlayed.name === this.topCard.name
      ) {
        //convert to function : FIX

        switch (cardPlayed.type) {
          case "reverse":
            //convert to function: FIX
            this.currentType = "reverse";

            if (this.direction === "forward") {
              this.direction = "reverse";
              break;
            } else {
              this.direction = "forward";
              break;
            }
          case "skip":
            this.currentType = "skip";
            break;

          case "draw":
            this.currentType = "draw";
            for (let i = 0; i < 2; i++) {
              updatedNextPlayerHand.push(this.deck.pop());
            }
            break;

          default:
            this.currentType = "normal";
            break;
        }

        const playerGameInfo = {
          direction: this.direction,
          currPlayerIndex: currPlayerIndex,
          nextPlayerIndex: nextPlayerIndex,
          playerLength: playerLength,
          currentType: this.currentType,
        };

        if (updatedNextPlayerHand.length) {
          this.players[this.nextPlayerIndex].hand.push(
            ...updatedNextPlayerHand
          );
        }

        this.switchPlayers();

        currentPlayer.hand = removeCardFromHand(cardGameInfo);

        this.topCard = cardPlayed;
        this.discardPile = [...this.discardPile, cardPlayed];

        this.currentColor = this.topCard.color;

        return {
          status: "success",
          id: currentPlayer.id,
          updatedDeck: this.deck,
          updatedNextPlayerHand: updatedNextPlayerHand,
          updatedCurrentPlayerIndex: this.currentPlayerIndex,
          nextPlayerIndex: this.nextPlayerIndex,
          cardPlayed: cardPlayed,
        };
      } else if (
        cardPlayed.name === "Wild4card" ||
        cardPlayed.name === "Wildcard"
      ) {
        switch (cardPlayed.type) {
          case "Wild4":
            this.currentType = "Wild4";
            for (let i = 0; i < 4; i++) {
              updatedNextPlayerHand.push(this.deck.pop());
            }
            break;

          case "Wild":
            this.currentType = "Wild";
            break;
          default:
            break;
        }

        currentPlayer.hand = removeCardFromHand(cardGameInfo);
        this.topCard = cardPlayed;
        this.discardPile = [...this.discardPile, cardPlayed];

        return {
          status: "success",
          id: currentPlayer.id,
          updatedDeck: this.deck,
          updatedNextPlayerHand: updatedNextPlayerHand,
          cardPlayed: cardPlayed,
        };
      }
    }

    return {
      status: "error",
    };
  }

  WildMove(color) {
    this.currentColor = color;
    this.isColorChosen = true;

    this.switchPlayers();

    return {
      updatedCurrentPlayerIndex: this.currentPlayerIndex,
      nextPlayerIndex: this.nextPlayerIndex,
    };
  }

  getDeck() {
    return this.deck.getDeck();
  }

  getAvatarID() {
    let avatarID;
    while (true) {
      avatarID = Math.floor(Math.random() * 10);
      if (this.avatarIDList.includes(avatarID)) {
        continue;
      } else {
        this.avatarIDList.push(avatarID);
        break;
      }
    }
    return avatarID;
  }

  setTopCard(card) {
    this.topCard = card;
    this.currentColor = this.topCard.color;
    this.discardPile.push(card);
  }

  getTopCard() {
    console.log(this.topCard);
    return this.topCard;
  }

  removeFromDeck(playerID) {
    //draw and action card move
    //check if the deck.length is less than or equal 4, if so keep top card and add the rest of the discard pile to draw pile
    //remove from draw deck (call remove function from deck class) and find player with that id and add the card to the player's deck
  }
}

module.exports = GameState;
