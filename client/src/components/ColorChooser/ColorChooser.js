import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useMantineTheme,
  Modal,
  Chips,
  Chip,
  Button,
  Space,
  Center,
} from "@mantine/core";

import { useNotifications } from "@mantine/notifications";

import { colorChange, setWildCard } from "../../feature/gameSlice";
function ColorChooser() {
  const [opened, setOpened] = useState(true);
  const [color, setValue] = useState("red");
  const notifications = useNotifications();
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  function handleChooseColor() {
    notifications.showNotification({
      autoClose: 4000,
      color: color.toLowerCase(),
      message: `Color ${color} was Chosen!`,
    });
    setOpened(false);
    dispatch(colorChange(color));
    dispatch(setWildCard(false));
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(true)}
        title="Choose a Color!"
        hideCloseButton
        styles={{
          title: { color: `${theme.colors.violet[8]}`, fontWeight: "bold" },
        }}
      >
        <Center>
          <Chips value={color} onChange={setValue} color="dark">
            <Chip
              value="Red"
              sx={(theme) => ({
                backgroundColor: theme.colors.red[8],
              })}
            >
              Red
            </Chip>
            <Chip
              value="Green"
              sx={(theme) => ({
                backgroundColor: theme.colors.green[7],
              })}
            >
              Green
            </Chip>
            <Chip
              value="Blue"
              sx={(theme) => ({
                backgroundColor: theme.colors.blue[6],
              })}
            >
              Blue
            </Chip>
            <Chip
              value="Yellow"
              sx={(theme) => ({
                backgroundColor: theme.colors.yellow[5],
              })}
            >
              Yellow
            </Chip>
          </Chips>
        </Center>
        <Space h="sm" />
        <Center>
          <Button color="dark" radius="xs" onClick={handleChooseColor}>
            Ok
          </Button>
        </Center>
      </Modal>
    </>
  );
}

export default ColorChooser;
