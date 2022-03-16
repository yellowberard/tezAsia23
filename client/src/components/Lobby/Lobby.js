import React from "react";
import {
  createStyles,
  Text,
  Image,
  Group,
  Space,
  Card,
  Avatar,
} from "@mantine/core";
import logo from "../../assets/logo.png";
import { AVATARS } from "../../utils/constants";

const useStyles = createStyles((theme) => ({
  avatar: {
    border: `${theme.colors.dark[8]} solid 2px`,
    borderRadius: "50%",
    backgroundColor: `${theme.colors.gray[0]}`,
    width: "60px",
    height: "60px",
  },
}));

function Lobby({ roomName, playersList, waitingPlayers, maxRoomLength }) {
  const { classes } = useStyles();

  return (
    <>
      <Card
        shadow="sm"
        p="lg"
        sx={(theme) => ({
          width: 450,
          margin: "auto",
          backgroundColor: theme.colors.dark[5],
        })}
      >
        <Group position="apart">
          <Text
            weight={700}
            size="md"
            sx={(theme) => ({
              color: `${theme.colors.yellow[4]}`,
            })}
          >
            {roomName}
          </Text>

          <Text
            weight={700}
            size="md"
            sx={(theme) => ({
              color: `${theme.colors.green[4]}`,
            })}
          >
            {waitingPlayers} / {maxRoomLength} players
          </Text>
        </Group>

        <Space h="md" />

        <Image
          width={130}
          height={110}
          radius="md"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          src={logo}
          alt="Uno Game Logo"
        />

        <Space h="md" />

        <Text
          weight={700}
          size="lg"
          sx={(theme) => ({
            color: `${theme.colors.green[4]}`,
          })}
          underline
        >
          Players in room:
        </Text>

        <Space h="md" />

        <Group
          position="center"
          sx={{
            marginLeft: "3px",
          }}
        >
          {playersList.map((player) => {
            return (
              <div key={player.id}>
                <Group direction="column" position="center">
                  <Avatar
                    className={classes.avatar}
                    src={AVATARS[player.avatarID]}
                    alt="Animal Avatar for nametag"
                  />
                  <Text
                    size="lg"
                    sx={(theme) => ({
                      color: `${theme.colors.blue[4]}`,
                    })}
                  >
                    {player.name}
                  </Text>
                </Group>
              </div>
            );
          })}
        </Group>

        <Space h="xl" />

        <Text
          sx={(theme) => ({
            color: `${theme.colors.gray[0]}`,
            display: "flex",
            justifyContent: "center",
          })}
        >
          Waiting for other players to join...
        </Text>
      </Card>
    </>
  );
}

export default Lobby;
