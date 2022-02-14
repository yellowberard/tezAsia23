export default class Hand {
  constructor() {
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  removeCard(cardID) {
    if (this.getTotalCards() === 0) {
      return null; // hand is empty -> possible win!
    }
    const removedCardIndex = this.cards.findIndex((card) => card.id === cardID);
    const removedCard = this.cards.splice(removedCardIndex, 1).pop();

    return removedCard;
  }

  getTotalCards() {
    return this.cards.length;
  }
}
