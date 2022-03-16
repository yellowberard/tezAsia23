//Shuffle players and cards (Fisher–Yates shuffle)
function shuffle(items) {
  let shuffledArray = [...items];
  let m = shuffledArray.length;

  let index;
  let temp;

  while (m) {
    index = Math.floor(Math.random() * m--);

    temp = shuffledArray[m];
    shuffledArray[m] = shuffledArray[index];
    shuffledArray[index] = temp;
  }

  return shuffledArray;
}
/* 
export function getRandomAvatar(playersLength) {
  let avatarList = [];
  let avatarID;
  while (avatarList.length < playersLength + 1) {
    avatarID = Math.floor(Math.random() * 10);
    if (avatarList.includes(avatarID)) {
      continue;
    } else {
      avatarList.push(avatarID);
    }
  }

  return avatarList;
}
 */

module.exports = { shuffle };
