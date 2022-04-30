import { ActionIcon, createStyles, Indicator } from "@mantine/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BrandHipchat } from "tabler-icons-react";
import ChatBox from "./ChatBox";

const useStyles = createStyles((theme) => ({
  chatButton: {
    position: "absolute",
    top: "80%",
    left: "35%",

    "@media (max-width: 868px)": {
      left: "35%",
    },

    "@media (max-width: 444px)": {
      left: "54%",
    },
  },
}));

function Chat() {
  const { classes } = useStyles();

  const [opened, setOpened] = useState(false);

  return (
    <>
      {opened && <ChatBox />}

      <Indicator
        color="yellow"
        className={classes.chatButton}
        inline
        label={5}
        size={16}
      >
        <ActionIcon
          color="dark"
          size="xl"
          radius="xl"
          variant="filled"
          onClick={() => setOpened((o) => !o)}
        >
          <BrandHipchat />
        </ActionIcon>
      </Indicator>
    </>
  );
}

export default Chat;
