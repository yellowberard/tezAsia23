export default class Player {
  constructor(id, name, room) {
    this.id = id;
    this.name = name;
    this.room = room;
    this.hand = [];
  }

  addCardToHand(card) {
    //call addCard from deck class (this.hand.addCard(card))
    this.hand.addCard(card);
  }

  removeCardFromHand(cardID) {
    // find a way to put the whole component of card to remove in parameter
    //call removeCard from deck class (this.hand.removeCard(card))
    return this.hand.removeCard(cardID);
    //return card; // find a way to return the removed card component
  }

  getHand() {
    console.log(this.hand);
    return this.hand;
  }

  getHandTotal() {
    return this.hand.getTotalCards();
  }
}
