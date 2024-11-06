import { io } from "socket.io-client";

export const socket = new io('/', {
    autoConnect: false,
    withCredentials: false
})