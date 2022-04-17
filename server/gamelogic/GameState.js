const {
  switchTwoPlayerGame,
  switchPlayers,
  removeCardFromHand,
  getWinnerScore,
  canPlayWild4Card,
} = require("./utils/gameLogicUtils");
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
    this.isWin = false;
    this.players = [];
  }

  Win(currentPlayerID) {
    //determine win (if a player's card == 0) then they win
    const currentPlayer = this.players.find(
      (player) => player.id === currentPlayerID
    );
    console.log(currentPlayer.hand.length); //TEST

    return currentPlayer.hand.length === 0;
  }

  switchPlayers(type = "") {
    let currPlayerIndex = this.currentPlayerIndex;
    let nextPlayerIndex = this.nextPlayerIndex;
    let playerLength = this.players.length;

    //console.log("maxPlayer: ", playerLength <= 2); //TEST
    const playerGameInfo = {
      direction: this.direction,
      currPlayerIndex: currPlayerIndex,
      nextPlayerIndex: nextPlayerIndex,
      playerLength: playerLength,
      currentType: type ? type : this.currentType,
    };

    /*  console.log("length: ", playerLength); //TEST
    console.log("currPlayer: ", currPlayerIndex); //TEST
    console.log("nextPlayer: ", nextPlayerIndex); //TEST */

    // switch player
    [currPlayerIndex, nextPlayerIndex] =
      playerLength <= 2
        ? switchTwoPlayerGame(playerGameInfo)
        : switchPlayers(playerGameInfo);

    /*
    console.log("curr3: ", playerIndex[0]);
    console.log("curr4: ", playerIndex[1]); */

    this.currentPlayerIndex = currPlayerIndex;
    this.nextPlayerIndex = nextPlayerIndex;

    //console.log("currPlayer2: ", this.currentPlayerIndex); //TEST
    //console.log("nextPlayer2: ", this.nextPlayerIndex); //TEST
  }

  Move({ playerID, cardPlayed }) {
    //check if player can move card (if current turn) and if the card is a valid move or not
    //use removeFromDeck and switchPlayer, call players method (removeCardFromHand to get the remove card and set the Top card to that)
    //set Game State
    let currentPlayer = this.players[this.currentPlayerIndex];
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

        if (updatedNextPlayerHand.length) {
          this.players[this.nextPlayerIndex].hand.push(
            ...updatedNextPlayerHand
          );
        }
        console.log(currentPlayer.name);

        this.switchPlayers();

        currentPlayer.hand = removeCardFromHand(cardGameInfo);

        console.log("2:", currentPlayer.name);

        this.topCard = cardPlayed;
        this.discardPile = [...this.discardPile, cardPlayed];

        this.currentColor = this.topCard.color;

        return {
          status: "success",
          id: currentPlayer.id,
          updatedDeck: this.deck,
          updatedNextPlayerHand: updatedNextPlayerHand,
          updatedCurrentPlayerIndex: this.currentPlayerIndex,
          prevNextPlayer: this.prevNextPlayerIndex,
          nextPlayerIndex: this.nextPlayerIndex,
          cardPlayed: cardPlayed,
        };
      } else if (
        cardPlayed.name === "Wild4card" ||
        cardPlayed.name === "Wildcard"
      ) {
        const wild4Info = {
          currentPlayer: currentPlayer,
          currentColor: this.currentColor,
        };

        switch (cardPlayed.type) {
          case "Wild4":
            if (canPlayWild4Card(wild4Info)) {
              this.currentType = "Wild4";
              for (let i = 0; i < 4; i++) {
                updatedNextPlayerHand.push(this.deck.pop());
              }
              break;
            } else {
              return {
                status: "error",
              };
            }

          case "Wild":
            this.currentType = "Wild";
            break;
          default:
            break;
        }

        if (updatedNextPlayerHand.length) {
          this.players[this.nextPlayerIndex].hand.push(
            ...updatedNextPlayerHand
          );
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

  Draw(playerID) {
    this.currentType = "drawPile";
    let currentPlayer = this.players[this.currentPlayerIndex];

    if (this.deck.length <= 8) {
      //move cards in discard except topCard to deckpile and shuffle again
      console.log("deck is low in draw");
    }
    if (currentPlayer.id === playerID) {
      const currentPlayerHand = this.players[this.currentPlayerIndex].hand;
      const discardCard = this.deck.pop();
      currentPlayerHand.push(discardCard);

      // switch player
      this.switchPlayers();

      return {
        status: "success",
        id: currentPlayer.id,
        updatedDeck: this.deck,
        updatedCurrentPlayerIndex: this.currentPlayerIndex,
        nextPlayerIndex: this.nextPlayerIndex,
        discardCard: discardCard,
      };
    }

    return {
      status: "error",
    };
  }

  getDeck() {
    return this.deck.getDeck();
  }

  getWinnerScore() {
    return getWinnerScore(this.players);
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
}

module.exports = GameState;
