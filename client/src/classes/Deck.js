import { shuffle } from "./../utils";
import { v4 as uuidv4 } from "uuid";

import {
  ASSETSBLUE,
  ASSETSRED,
  ASSETSYELLOW,
  ASSETSGREEN,
  ASSETSREVERSE,
  ASSETSDRAW,
  COLORS,
  WILDS,
  ASSETSWILD,
  ASSETSKIP,
  ASSETSZERO,
} from "../utils/constants";
/* 
 blue0,
  blue1,
  blue2,
  blue3,
  blue4,
  blue5,
  blue6,
  blue7,
  blue8,
  blue9,
*/

export default class Deck {
  constructor(cards) {
    this.cards = [];
    this.createDeck();
    this.shuffle();
  }

  //name;
  // src;
  //color;
  //type;

  //create deck full of cards
  createDeck() {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 9; j++) {
        this.cards.push({
          id: uuidv4(),
          name: (j + 1).toString(),
          src: ASSETSBLUE[j],
          color: "Blue",
          type: "number",
        });

        this.cards.push({
          id: uuidv4(),
          name: (j + 1).toString(),
          src: ASSETSRED[j],
          color: "Red",
          type: "number",
        });

        this.cards.push({
          id: uuidv4(),
          name: (j + 1).toString(),
          src: ASSETSYELLOW[j],
          color: "Yellow",
          type: "number",
        });

        this.cards.push({
          id: uuidv4(),
          name: (j + 1).toString(),
          src: ASSETSGREEN[j],
          color: "Green",
          type: "number",
        });
      }
    }

    for (let i = 0; i < 4; i++) {
      this.cards.push({
        id: uuidv4(),
        name: (0).toString(),
        src: ASSETSZERO[i],
        color: COLORS[i].toString(),
        type: "number",
      });
    }

    for (let i = 0; i < 2; i++) {
      for (let i = 0; i < COLORS.length; i++) {
        this.cards.push({
          id: uuidv4(),
          name: `${COLORS[i]}reverse`,
          src: ASSETSREVERSE[i],
          color: COLORS[i],
          type: "reverse",
        });
        this.cards.push({
          id: uuidv4(),
          name: `${COLORS[i]}skip`,
          src: ASSETSKIP[i],
          color: COLORS[i],
          type: "skip",
        });

        this.cards.push({
          id: uuidv4(),
          name: `${COLORS[i]}draw`,
          src: ASSETSDRAW[i],
          color: COLORS[i],
          type: "draw",
        });

        this.cards.push({
          id: uuidv4(),
          name: `${WILDS[i]}card`,
          src: ASSETSWILD[i],
          color: "random",
          type: "wild",
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
