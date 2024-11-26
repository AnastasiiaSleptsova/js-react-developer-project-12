import React, { useState, useEffect, useRef } from "react";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
} from "../../../../api/messagesApi";
import { MessageHeader } from "./MessageHeader/MessageHeader";
import { useSocketSetup } from "../../../../api/socket/useSocketSetup";
import { socket } from "../../../../api/socket/socket";
import { useTranslation } from "react-i18next";
import leoProfanity from "leo-profanity";
import { IoIosSend } from "react-icons/io";
import { PiX } from "react-icons/pi";

import classes from "./MessageList.module.css";

export const MessageList = ({ activeChannelId }) => {
  const { data: messages = [], isLoading } = useGetMessagesQuery();
  const [sendMessage] = useSendMessageMutation();
  const [messagesSocket, setMessagesFromSocket] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [deleteMessage] = useDeleteMessageMutation();
  useSocketSetup();
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);
  const username = localStorage.getItem("username");
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const handleNewMessage = (event) => {
      setMessagesFromSocket((prev) => {
        if (prev.find((msg) => msg.id === event.id)) return prev;
        return [...prev, event];
      });
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  const uniqueFiltredMessages = [
    ...messages.filter((message) => activeChannelId === message.channelId),
    ...messagesSocket.filter(
      (message) => activeChannelId === message.channelId
    ),
  ].reduce((acc, current) => {
    if (!acc.find((msg) => msg.id === current.id)) {
      acc.push(current);
    }
    return acc;
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [uniqueFiltredMessages]);

  const sendMessageHandler = async () => {
    if (newMessage) {
      const cleanMessage = leoProfanity.clean(newMessage);
      try {
        await sendMessage({
          body: cleanMessage,
          channelId: activeChannelId,
          username,
        }).unwrap();
        setNewMessage("");
      } catch (err) {
        console.error("Ошибка отправки сообщения:", err);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessageHandler();
  };

  const handleDeleteMessage = async (id) => {
    try {
      await deleteMessage(id).unwrap();
      setMessagesFromSocket((prev) => prev.filter((msg) => msg.id !== id));
      socket.emit("deleteMessage", id);
    } catch (err) {
      console.error("Ошибка при удалении сообщения:", err);
    }
  };

  if (isLoading) return <h1>{t("Загрузка...")}</h1>;

  return (
    <div className={classes.messageList}>
      <MessageHeader activeChannelId={activeChannelId} />
      <ul className={classes.messages}>
        {uniqueFiltredMessages?.map((message) => (
          <li
            key={message.id}
            className={classes.messageItem}
            onClick={() => {
              handleDeleteMessage(message.id);
            }}
          >
            <strong>{message.username || "admin"}: </strong>
            {message.body}
          </li>
        ))}
        <div ref={messagesEndRef}></div>
      </ul>
      <form className={classes.messageForm} onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={t("Введите сообщение...")}
          className={classes.messageInput}
        />
        <button type="submit" className={classes.sendButton}>
          <IoIosSend />
        </button>
      </form>
    </div>
  );
};
