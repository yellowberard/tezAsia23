import React, { useState } from "react";
import { useParams } from "react-router-dom";
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

import socket from "../../app/socket";

function ColorChooser() {
  const { id } = useParams();
  const [opened, setOpened] = useState(true);
  const [color, setValue] = useState("red");
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  function handleChooseColor() {
    /*  notifications.showNotification({
      autoClose: 4000,
      color: color.toLowerCase(),
      message: `Color ${color} was Chosen!`,
    }); */
    setOpened(false);
    socket.emit("change_current_color", { roomID: id, color: color });
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
