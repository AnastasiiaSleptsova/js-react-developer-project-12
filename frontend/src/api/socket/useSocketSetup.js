import { useEffect } from "react"
import { socket } from "./socket"

export const useSocketSetup = () => {
    useEffect(() => {
        socket.connect();
        socket.on('error', () => {
            console.log('!!! error');
        })

        return () => {
            socket.off("error")
        }
    }, [])
}