import io from "socket.io-client";
const ENDPOINT = "https://unobackend1.herokuapp.com/";
export default io(ENDPOINT, {
  closeOnBeforeunload: false,
});
