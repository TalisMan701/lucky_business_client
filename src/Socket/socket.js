import io from "socket.io-client";

const socket = io("http://192.168.3.4:8080")

export default socket;
