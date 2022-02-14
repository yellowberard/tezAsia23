import { v4 as uuidv4 } from "uuid";

export default class Card {
  constructor(name, src, color, type) {
    this.id = uuidv4();
    this.name = name;
    this.src = src;
    this.color = color;
    this.type = type;
  }

  getCardAction() {
    return this.type;
  }

  getCardID() {
    return this.id;
  }

  getColor() {
    return this.color;
  }

  getName() {
    return this.name;
  }

  getImageSrc() {
    return this.src;
  }
}
