const { shuffle } = require("./utils");
const { v4 } = require("uuid");

const {
  ASSETSBLUE,
  ASSETSRED,
  ASSETSGREEN,
  ASSETSYELLOW,
  ASSETSKIP,
  ASSETSDRAW,
  ASSETSREVERSE,
  ASSETSZERO,
  ASSETSWILD,
  WILDS,
  COLORS,
} = require("./constants.js");

class Deck {
  constructor() {
    this.cards = [];
    this.createDeck();
    this.shuffle();
  }

  createDeck() {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 9; j++) {
        this.cards.push({
          id: v4(),
          name: (j + 1).toString(),
          src: ASSETSBLUE[j],
          color: "Blue",
          type: "number",
        });

        this.cards.push({
          id: v4(),
          name: (j + 1).toString(),
          src: ASSETSRED[j],
          color: "Red",
          type: "number",
        });

        this.cards.push({
          id: v4(),
          name: (j + 1).toString(),
          src: ASSETSYELLOW[j],
          color: "Yellow",
          type: "number",
        });

        this.cards.push({
          id: v4(),
          name: (j + 1).toString(),
          src: ASSETSGREEN[j],
          color: "Green",
          type: "number",
        });
      }
    }

    for (let i = 0; i < 4; i++) {
      this.cards.push({
        id: v4(),
        name: (0).toString(),
        src: ASSETSZERO[i],
        color: COLORS[i].toString(),
        type: "number",
      });
    }

    for (let i = 0; i < 2; i++) {
      for (let i = 0; i < COLORS.length; i++) {
        this.cards.push({
          id: v4(),
          name: `reverse`,
          src: ASSETSREVERSE[i],
          color: COLORS[i],
          type: "reverse",
        });
        this.cards.push({
          id: v4(),
          name: `skip`,
          src: ASSETSKIP[i],
          color: COLORS[i],
          type: "skip",
        });

        this.cards.push({
          id: v4(),
          name: `draw`,
          src: ASSETSDRAW[i],
          color: COLORS[i],
          type: "draw",
        });

        this.cards.push({
          id: v4(),
          name: `${WILDS[i]}card`,
          src: ASSETSWILD[i],
          color: "random",
          type: `${WILDS[i]}`,
        });
      }
    }
  }

  removeCard() {
    if (this.getTotalCards() <= 8) {
      return null; //deck is getting low -> add cards from discard pile except top card to deck
    }
    return this.cards.pop();
  }

  shuffle() {
    this.cards = shuffle(this.cards);
  }

  addCard(card) {
    this.cards.push(card);
  }

  getDeck() {
    return this.cards;
  }

  getTotalCards() {
    return this.cards.length;
  }
}

module.exports = Deck;
