import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createStyles,
  TextInput,
  Title,
  Space,
  Paper,
  Group,
  Radio,
  RadioGroup,
  useMantineTheme,
  Checkbox,
  Text,
  Button,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { EyeCheck, EyeOff } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  background: {
    backgroundColor: theme.colors.red[6],
    width: "100vw",
    height: "100vh",
  },
  container: {
    width: "630px",
    height: "630px",
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
  const navigate = useNavigate();
  const theme = useMantineTheme();

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
    //resets password field when the private game checkbox is not clicked
    if (form.values.checked === false && form.values.password !== "") {
      form.setFieldValue("password", "");
    }
  }, [form, form.values.checked, form.values.password]);

  function handleSubmit(values) {
    console.log("values: ", values);
    console.log("room name: ", values.roomName);
    console.log("Name: ", values.name);
    console.log("checked: ", values.checked);
    console.log("values password: ", values.password);

    console.log("players: ", values.numOfPlayers);
    //call create game socket.io connection and pass all data to create new game and new player and add player to that game
    //navigate to waiting page
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
          <form onSubmit={form.onSubmit(handleSubmit)}>
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
                size="xl"
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
                <Space w="sm" />
                <Checkbox
                  {...form.getInputProps("checked", {
                    type: "checkbox",
                  })}
                  label={form.values.checked ? "Yes" : "No"}
                />
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
                  />
                ) : (
                  ""
                )}
              </Group>
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
      </div>
    </div>
  );
}

export default CreateGame;
