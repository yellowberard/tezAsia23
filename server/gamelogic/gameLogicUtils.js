//more than two player game for switching players
function switchPlayers({
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
function switchTwoPlayerGame({
  currPlayerIndex,
  nextPlayerIndex,
  playerLength,
  currentType,
}) {
  //if playing reverseCard,skip Card, draw2 or WildDraw 4 Card, can play again
  //else wildcard, regular card goes to next player
  //console.log("currentType: ", currentType);  TEST
  //console.log("curr: ", currPlayerIndex); TEST
  //console.log("next: ", nextPlayerIndex); TEST
  switch (currentType) {
    case "reverse":
    case "skip":
    case "draw":
    case "Wild4":
      // console.log("herewe"); TEST
      return [currPlayerIndex, nextPlayerIndex];

    default:
    case "leave_game":
      currPlayerIndex = (currPlayerIndex + 1) % playerLength;
      nextPlayerIndex = (nextPlayerIndex + 1) % playerLength;
      // console.log("bye1: ", currPlayerIndex); TEST
      // console.log("bye2: ", nextPlayerIndex); TEST
      return [currPlayerIndex, nextPlayerIndex];
  }
}

function removeCardFromHand({ currentPlayer, cardPlayed }) {
  return currentPlayer.hand.filter((card) => card.id !== cardPlayed.id);
}

function getWinnerScore(players) {
  let score = 0;

  players.forEach((player) => {
    player.hand.forEach((card) => {
      score = score + checkCardScore(card);
    });
  });

  return score;
}

function checkCardScore(card) {
  switch (card.type) {
    case "reverse":
    case "draw":
    case "skip":
      return 20;

    case "Wild4":
    case "Wild":
      return 50;

    default:
      return 1;
  }
}

module.exports = {
  switchPlayers,
  switchTwoPlayerGame,
  removeCardFromHand,
  getWinnerScore,
};
