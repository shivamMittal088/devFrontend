import io from "socket.io-client";
import { URL } from "./Constants";

const createSocketConnection = () => {
  if (window.location.hostname === "localhost") {
    return io(URL);
  } else {
    return io("/", { path: "api/socket.io" });
  }
};

export default createSocketConnection;