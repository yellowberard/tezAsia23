//more than two player game for switching players
function switchPlayers({
  direction,
  currPlayerIndex,
  nextPlayerIndex,
  playerLength,
  currentType,
}) {
  const switchPlayerInfo = {
    currPlayerIndex: currPlayerIndex,
    nextPlayerIndex: nextPlayerIndex,
    length: playerLength,
    currentType: currentType,
  };
  switch (direction) {
    case "reverse":
      //return (currPlayerIndex - 1 + playerLength) % playerLength;
      return reversePlayersTurn(switchPlayerInfo);

    case "forward":
      return switchPlayersTurn(switchPlayerInfo);

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
  //console.log("currentType: ", currentType);  //TEST
  //console.log("curr: ", currPlayerIndex); //TEST
  //console.log("next: ", nextPlayerIndex); //TEST
  switch (currentType) {
    case "reverse":
    case "skip":
    case "draw":
    case "Wild4":
      // console.log("herewe"); //TEST
      return [currPlayerIndex, nextPlayerIndex];

    default:
    case "leave_game":
      currPlayerIndex = (currPlayerIndex + 1) % playerLength;
      nextPlayerIndex = (nextPlayerIndex + 1) % playerLength;
      // console.log("bye1: ", currPlayerIndex); //TEST
      // console.log("bye2: ", nextPlayerIndex); //TEST
      return [currPlayerIndex, nextPlayerIndex];
  }
}

function switchPlayersTurn({
  currPlayerIndex,
  nextPlayerIndex,
  length,
  currentType,
}) {
  // console.log("start1: ", currPlayerIndex); //TEST
  //  console.log("start2: ", nextPlayerIndex); //TEST
  switch (currentType) {
    case "skip":
    case "Wild4":
    case "draw":
      // next person either draws 2 or 4 or get skip and loses turn
      currPlayerIndex = (nextPlayerIndex + 1 + length) % length;
      nextPlayerIndex = (currPlayerIndex + 1 + length) % length;
      // console.log("bye1: ", currPlayerIndex); //TEST
      // console.log("bye2: ", nextPlayerIndex); //TEST
      return [currPlayerIndex, nextPlayerIndex];

    //Numbered Cards and Wild
    default:
      //case "leave_game":
      currPlayerIndex = (currPlayerIndex + 1) % length;
      nextPlayerIndex = (nextPlayerIndex + 1) % length;
      //console.log("bye1: ", currPlayerIndex);
      // console.log("bye2: ", nextPlayerIndex);

      return [currPlayerIndex, nextPlayerIndex];
  }
}

function reversePlayersTurn({
  currPlayerIndex,
  nextPlayerIndex,
  length,
  currentType,
}) {
  switch (currentType) {
    case "skip":
      // next person to be played loses turn
      // currPlayerIndex =  (currPlayerIndex - 2 + playerLength) % playerLength;
      // nextPlayerIndex =(currPlayerIndex - 1 + playerLength) % playerLength;

      break;

    case "draw":
      // next player draws 2 and forfeits their turn
      //keep track of next person -> person getting 2 cards and turn getting skipped
      // and next next person -> next person whose turn it is curr player
      // and next player (next player after next next player)

      //prevNextPlayerIndex = (currPlayerIndex + 1 + playerLength) % playerLength;
      // currPlayerIndex =  (currPlayerIndex - 2 + playerLength) % playerLength;
      // nextPlayerIndex =(currPlayerIndex - 1 + playerLength) % playerLength;

      break;

    //Numbered Cards and Wild and Wild+4
    default:
      [currPlayerIndex, nextPlayerIndex] =
        (currPlayerIndex - 1 + playerLength) % playerLength;

      // console.log("bye3: ", currPlayerIndex); //TEST
      // console.log("bye4: ", nextPlayerIndex); //TEST

      return [currPlayerIndex, nextPlayerIndex];
  }
}

function removeCardFromHand({ currentPlayer, cardPlayed }) {
  return currentPlayer.hand.filter((card) => card.id !== cardPlayed.id);
}

function canPlayWild4Card({ currentPlayer, currentColor }) {
  let canPlay = true;
  currentPlayer.hand.map((card) => {
    console.log(`${card.color} == ${currentColor} `);
    if (card.color === currentColor) {
      canPlay = false;
    }
  });

  return canPlay;
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
      return Number(card.name);
  }
}

module.exports = {
  switchPlayers,
  switchTwoPlayerGame,
  canPlayWild4Card,
  removeCardFromHand,
  getWinnerScore,
};
