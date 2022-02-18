import { shuffle } from "./../utils";
import Deck from "../classes/Deck";

export default class GameState {
  constructor(players) {
    this.players = players;
    this.currentPlayer = ""; // current player's turn
    this.deck = new Deck();
    this.topCard = this.deck.removeCard();
    this.discardPile = [];
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

  setTopCard(card) {
    this.topCard = card;
    this.addToDiscardPile(card);
  }

  getTopCard() {
    console.log(this.topCard);
    return this.topCard;
  }

  addToDiscardPile(card) {
    this.discardPile.append(card);
  }

  removeFromDeck(playerID) {
    //draw and action card move
    //check if the deck.length is less than or equal 4, if so keep top card and add the rest of the discard pile to draw pile
    //remove from draw deck (call remove function from deck class) and find player with that id and add the card to the player's deck
  }

  getPlayers() {
    return this.players;
  }
}
