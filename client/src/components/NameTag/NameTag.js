import { Avatar, Badge, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";

import { useSelector } from "react-redux";

import { AVATARS } from "../../utils/constants";

function NameTag({ playerName, playerID, id }) {
  const theme = useMantineTheme();
  const playerList = useSelector((state) => state.game.players);
  const currIndex = useSelector((state) => state.game.currentPlayer);

  let isCurrentPlayer = playerList[currIndex].id === playerID;

  const avatar = (
    <Avatar
      sx={{
        border: `${theme.colors.dark[8]} solid 2px`,
        borderRadius: "50%",
        backgroundColor: isCurrentPlayer
          ? `${theme.colors.blue[3]}`
          : `${theme.colors.gray[0]}`,
      }}
      alt="Animal Avatar for nametag"
      size={45}
      mr={5}
      src={AVATARS[id]}
    />
  );

  return (
    <div>
      {playerName ? (
        <Badge
          sx={{
            paddingLeft: 0,
            height: "50px",
            width: "200px",
            fontSize: "15px",
          }}
          radius="xl"
          color=""
          leftSection={avatar}
        >
          {playerName}
        </Badge>
      ) : (
        <Avatar
          sx={{
            border: `${theme.colors.dark[8]} solid 2px`,
            borderRadius: "50%",
            backgroundColor: isCurrentPlayer
              ? `${theme.colors.blue[3]}`
              : `${theme.colors.gray[0]}`,
          }}
          src={AVATARS[id]}
          size={80}
          alt="Animal Avatar for nametag"
        />
      )}
    </div>
  );
}

export default NameTag;
