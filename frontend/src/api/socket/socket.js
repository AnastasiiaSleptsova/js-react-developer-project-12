import { io } from "socket.io-client";

export const socket = new io('http://localhost:3000', {
    autoConnect: false,
    withCredentials: false
})