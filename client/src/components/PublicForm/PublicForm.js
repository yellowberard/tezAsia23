import { Button, Center, Group, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import socket from "../../app/socket";

function PublicForm({ roomID }) {
  const form = useForm({
    initialValues: {
      name: "",
    },

    validationRules: {
      name: (value) => value.trim().length >= 2 && value.trim().length <= 6,
    },
    errorMessages: {
      name: "Name must include at least 2 characters and max 6 characters",
    },
  });

  function joinRoom(values) {
    const joinInfo = {
      room: roomID,
      name: values.name,
      password: "",
    };

    console.log(joinInfo);
    socket.emit("join_room", joinInfo);
  }
  return (
    <>
      <form onSubmit={form.onSubmit(joinRoom)}>
        <Group position="center" direction="column" grow>
          <TextInput
            required
            placeholder="nickname"
            label="your name"
            radius="xl"
            size="sm"
            {...form.getInputProps("name")}
          />
        </Group>
        <Space h="md" />
        <Center>
          <Button type="submit" color="dark" size="md">
            Join Game
          </Button>
        </Center>
      </form>
    </>
  );
}

export default PublicForm;
