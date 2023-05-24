import io from "socket.io-client";
const ENDPOINT = "https://unobackend.onrender.com";
export default io(ENDPOINT, {
  closeOnBeforeunload: false,
});
