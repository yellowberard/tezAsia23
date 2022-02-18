import { Avatar, Badge, useMantineTheme } from "@mantine/core";

import { AVATARS } from "../../utils/constants";

function NameTag({ playerName }) {
  function getRandomAvatar() {
    return AVATARS[Math.floor(Math.random() * AVATARS.length)];
  }

  const randomAvatarSrc = getRandomAvatar();
  const theme = useMantineTheme();

  const avatar = (
    <Avatar
      sx={{
        border: "black solid 2px",
        borderRadius: "50%",
        backgroundColor: `${theme.colors.gray[0]}`,
      }}
      alt="Avatar for badge"
      size={45}
      mr={5}
      src={randomAvatarSrc}
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
            border: "black solid 5px",
            borderRadius: "50%",
            backgroundColor: `${theme.colors.gray[0]}`,
          }}
          src={randomAvatarSrc}
          size={80}
          alt="it's me"
        />
      )}
    </div>
  );
}

export default NameTag;
