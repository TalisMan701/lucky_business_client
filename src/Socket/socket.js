import io from "socket.io-client";

/*const socketCreate = (userId) => {
	return io("http://192.168.3.4:8080", {query: {token: userId}})
}*/

const socket = io("https://lucky-business.ru", {query: {token: localStorage.getItem("token")}})

export default socket;
