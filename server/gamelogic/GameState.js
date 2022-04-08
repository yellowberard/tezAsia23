const Deck = require("./Deck");

class GameState {
  constructor() {
    this.avatarIDList = [];
    this.currentPlayer = ""; // current player's turn
    this.nextPlayer = "";
    this.currentColor = "";
    this.deck = new Deck();
    this.topCard = this.deck.removeCard();
    this.discardPile = [];
    this.gameStart = false;
  }

  Win() {
    //determine win (if a player's card == 0) then they win
  }

  switchPlayer(action, currentPlayerID) {
    //if acion is number and  => switch to the next player in list normally
    //if action is reverse => reverse list and go the other way and set player accordingly (find way to keep going in the reverse direction..
    //maybe shuffle accordingly to action and set player array in gameState )
    //if action is skip => skip next player in array and set next next player in list
    //return set this.turn to the new player and return this.turn
  }

  Move(playerID, card) {
    //check if player can move card (if current turn) and if the card is a valid move or not
    //use removeFromDeck and switchPlayer, call players method (removeCardFromHand to get the remove card and set the Top card to that)
    //set Game State
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
