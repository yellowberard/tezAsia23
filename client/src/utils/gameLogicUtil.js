//more than two player game for switching players
export function switchPlayers({
  direction,
  currPlayerIndex,
  nextPlayerIndex,
  playerLength,
  currentType,
}) {
  switch (direction) {
    case "reverse":
      return (currPlayerIndex - 1 + playerLength) % playerLength;

    case "forward":
      return (currPlayerIndex + 1) % playerLength;

    default:
      break;
  }
}

//two player game for switching players
export function switchTwoPlayerGame({
  currPlayerIndex,
  nextPlayerIndex,
  playerLength,
  currentType,
}) {
  //if playing reverseCard,skip Card, draw2 or WildDraw 4 Card, can play again
  //else wildcard, regular card goes to next player
  switch (currentType) {
    case "reverse":
    case "skip":
    case "draw":
    case "Wild4":
      return [currPlayerIndex, nextPlayerIndex];

    default:
      currPlayerIndex = (currPlayerIndex + 1) % playerLength;
      nextPlayerIndex = (nextPlayerIndex + 1) % playerLength;
      return [currPlayerIndex, nextPlayerIndex];
  }
}

export function removeCardFromHand({ currentPlayer, cardPlayed }) {
  return currentPlayer.hand.filter((card) => card.id !== cardPlayed.id);
}
