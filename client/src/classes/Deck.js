import Card from "../classes/Card";
import { shuffle } from "./../utils";

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
        this.cards.push(
          new Card((j + 1).toString(), ASSETSBLUE[j], "Blue", "number")
        );
        this.cards.push(
          new Card((j + 1).toString(), ASSETSRED[j], "RED", "number")
        );

        this.cards.push(
          new Card((j + 1).toString(), ASSETSYELLOW[j], "Yellow", "number")
        );

        this.cards.push(
          new Card((j + 1).toString(), ASSETSGREEN[j], "Green", "number")
        );
      }
    }

    for (let i = 0; i < 4; i++) {
      this.cards.push(
        new Card((0).toString(), ASSETSZERO[i], COLORS[i].toString(), "number")
      );
    }

    for (let i = 0; i < 2; i++) {
      for (let i = 0; i < COLORS.length; i++) {
        this.cards.push(
          new Card(
            `${COLORS[i]}reverse`,
            ASSETSREVERSE[i],
            COLORS[i],
            "reverse"
          )
        );
        this.cards.push(
          new Card(`${COLORS[i]}skip`, ASSETSKIP[i], COLORS[i], "skip")
        );

        this.cards.push(
          new Card(`${COLORS[i]}draw`, ASSETSDRAW[i], COLORS[i], "draw")
        );

        this.cards.push(
          new Card(`${WILDS[i]}card`, ASSETSWILD[i], "random", "wild")
        );
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

  getTotalCards() {
    return this.cards.length;
  }
}
