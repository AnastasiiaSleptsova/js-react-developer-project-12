import { useEffect } from "react";
import { socket } from "./socket";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useSocketSetup = () => {
  useEffect(() => {
    socket.connect();
    socket.on("error", () => {
      console.log("!!! error");
      toast.error("Упс. Что-то пошло не так"); // TODO добавить логику i18n
    });

    return () => {
      socket.off("error");
    };
  }, []);
};
