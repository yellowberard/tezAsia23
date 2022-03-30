import React, { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import {
  createStyles,
  TextInput,
  Title,
  Space,
  Paper,
  Group,
  Modal,
  Radio,
  RadioGroup,
  useMantineTheme,
  Checkbox,
  Text,
  Button,
  PasswordInput,
} from "@mantine/core";
import { useForm, useClipboard } from "@mantine/hooks";
import { EyeCheck, EyeOff } from "tabler-icons-react";
import socket from "../app/socket";

const useStyles = createStyles((theme) => ({
  background: {
    backgroundColor: theme.colors.red[6],
    width: "100vw",
    height: "100vh",
  },
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
  },
  radio: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function CreateGame() {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(true);
  const [roomID, setRoomID] = useState("");
  const [isPrivateGame, setIsPrivateGame] = useState(false);
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const clipboard = useClipboard({ timeout: 500 });

  const form = useForm({
    initialValues: {
      roomName: "",
      name: "",
      numOfPlayers: "2",
      checked: false,
      password: "",
    },

    validationRules: {
      roomName: (value) => value.trim().length >= 2 && value.trim().length <= 8,
      name: (value) => value.trim().length >= 2 && value.trim().length <= 6,

      password: (password, values) =>
        (values.checked === true && password !== "") ||
        (values.checked === false && password === "") ||
        (values.checked === false && password !== ""),
    },
    errorMessages: {
      roomName:
        "room name must include at least 2 characters and max 8 characters",
      name: "Name must include at least 2 characters and max 6 characters",
      password: "You must enter a password if you want your game to be private",
    },
  });

  useEffect(() => {
    return () => {
      setIsPrivateGame(false);
    };
  }, []);

  useEffect(() => {
    //resets password field when the private game checkbox is not clicked
    if (form.values.checked === false && form.values.password !== "") {
      form.setFieldValue("password", "");
    }
  }, [form, form.values.checked, form.values.password]);

  useEffect(() => {
    socket.on("private_game_created", (roomName) => {
      setIsPrivateGame(true);
      setRoomID(roomName);
    });

    socket.on("public_game_created", (roomName) => {
      setIsPrivateGame(false);
    });
  }, [navigate]);

  function handleRoomCodeClick() {
    handleNavigate(roomID);
  }

  function handleNavigate(id) {
    const waitingRoomPath = generatePath("/WaitingRoom/gameroom=:id", {
      id: id,
    });
    navigate(waitingRoomPath);
  }

  function joinRoom(values) {
    const gameInfo = {
      room: values.roomName,
      name: values.name,
      maxPlayers: values.numOfPlayers,
      password: values.password,
      publicGameCheck: values.checked ? "private" : "public",
    };
    socket.emit("create_game", gameInfo);
  }

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <Paper padding="md" shadow="xs" radius="xl" withBorder>
          <Title
            sx={{
              color: `${theme.colors.dark[6]}`,
              display: "flex",
              justifyContent: "center",
            }}
            order={1}
          >
            Create Game
          </Title>

          <Space h="xl" />

          <form onSubmit={form.onSubmit(joinRoom)}>
            <Group position="center" direction="column" grow>
              <TextInput
                required
                placeholder="room"
                label="Room Name"
                radius="xl"
                size="md"
                {...form.getInputProps("roomName")}
              />

              <TextInput
                required
                placeholder="your name"
                label="Nickname"
                radius="xl"
                size="md"
                {...form.getInputProps("name")}
              />

              <RadioGroup
                required
                className={classes.radio}
                label="Select number of players in the game."
                size="lg"
                color="red"
                {...form.getInputProps("numOfPlayers", { type: "radiogroup" })}
              >
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
                <Radio value="4">4</Radio>
              </RadioGroup>

              <Group>
                <Text size="xl" weight={700}>
                  Private Game?{" "}
                </Text>

                <Checkbox
                  {...form.getInputProps("checked", {
                    type: "checkbox",
                  })}
                  label={form.values.checked ? "Yes" : "No"}
                />
              </Group>

              {form.values.checked ? (
                <PasswordInput
                  required
                  label="Game Password"
                  placeholder="Change visibility toggle icon"
                  description="Do not forget to give your opponents this password. Remember it is a secret :)."
                  visibilityToggleIcon={({ reveal, size }) =>
                    reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
                  }
                  {...form.getInputProps("password")}
                  size="sm"
                  radius="xl"
                />
              ) : (
                ""
              )}
            </Group>

            <Space h="xl" />

            <Group position="apart">
              <Button
                color="dark"
                size="md"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </Button>

              <Button type="submit" color="dark" size="md">
                Create
              </Button>
            </Group>
          </form>
        </Paper>

        {isPrivateGame && (
          <div>
            <Modal
              opened={opened}
              onClose={() => setOpened(true)}
              title="Room Code (Private Game)!"
              hideCloseButton
              styles={{
                title: {
                  color: `${theme.colors.orange[8]}`,
                  fontWeight: "bold",
                },
              }}
            >
              <Text>
                Dont forget to copy the room code down below, in able for other
                players to join your game:
              </Text>

              <Group position="center" direction="column">
                <Text color="orange">{roomID}</Text>

                <Group>
                  <Button
                    size="xs"
                    color={clipboard.copied ? "teal" : "blue"}
                    onClick={() => clipboard.copy(roomID)}
                  >
                    {clipboard.copied ? "Copied" : "Copy"}
                  </Button>

                  <Button size="xs" onClick={handleRoomCodeClick}>
                    ok
                  </Button>
                </Group>
              </Group>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateGame;
