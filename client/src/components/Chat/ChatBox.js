import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Send, Dots } from "tabler-icons-react";
import {
  ActionIcon,
  Box,
  Center,
  Container,
  createStyles,
  Group,
  ScrollArea,
  Text,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
  chatbox: {
    position: "absolute",
    top: "54.5%",
    left: "60%",

    "@media (max-width: 1280px)": {
      top: "46.5%",
    },

    "@media (max-width: 1024px)": {
      top: "28.7%",
    },

    "@media (max-width: 988px)": {
      left: "64.6%",
    },
    "@media (max-width: 952px)": {
      left: "60%",
    },

    "@media (max-width: 816px)": {
      top: "25%",
      left: "25%",
    },

    "@media (max-width: 450px)": {
      top: "20%",
      left: "10%",
    },
  },

  border: {
    border: `2px solid ${theme.colors.dark[8]}`,
  },

  borderSm: {
    border: `1.3px solid ${theme.colors.dark[8]}`,
  },

  redColor: {
    backgroundColor: theme.colors.red[1],
  },

  inputContainer: {
    display: "flex",
    paddingLeft: "0",
  },

  inputBox: {
    paddingRight: "6px",
    flexDirection: "row",
    flexWrap: "nowrap",
  },

  messageContainer: {
    backgroundColor: theme.colors.red[4],
  },
}));

function ChatBox() {
  const { id } = useParams();
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const roomName = useSelector((state) => state.game.roomName);

  const form = useForm({
    initialValues: {
      message: "",
    },

    validate: {
      message: (value) =>
        value !== "" ? null : "need to enter a message to send",
    },
  });

  function sendMessage(values) {
    console.log(values);
    //emit all submited messages here
    form.setFieldValue("message", "");
  }

  useEffect(() => {
    //recieve the sended message here (socket.on)
  }, []);

  return (
    <>
      <Box
        className={cx(classes.chatbox, classes.border)}
        //shadow="xl"
        radius="md"
        //withBorder
      >
        <Container
          className={cx(
            classes.titleContainer,
            classes.border,
            classes.redColor
          )}
        >
          <Group>
            <Dots size={35} strokeWidth={4.5} color={"#bf4540"} />

            <Center>
              <Text
                size="xl"
                weight={700}
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                <Text color="blue" inherit component="span">
                  {roomName}
                </Text>{" "}
                Chatbox
              </Text>
            </Center>
          </Group>
        </Container>

        <Container className={cx(classes.messageContainer, classes.borderSm)}>
          <ScrollArea
            style={{ height: 300, width: 300 }}
            type="auto"
            scrollbarSize={18}
          >
            <Text>Message Here</Text>
          </ScrollArea>
        </Container>

        <Container
          className={cx(
            classes.inputContainer,
            classes.border,
            classes.redColor
          )}
        >
          <form onSubmit={form.onSubmit(sendMessage)}>
            <Group className={classes.inputBox}>
              <Textarea
                style={{ paddingRight: "15px" }}
                placeholder="Your message"
                size="lg"
                required
                {...form.getInputProps("message")}
              />

              <Center>
                <ActionIcon
                  size="xl"
                  color="red"
                  variant="filled"
                  type="submit"
                >
                  <Send />
                </ActionIcon>
              </Center>
            </Group>
          </form>
        </Container>
      </Box>
    </>
  );
}

export default ChatBox;
