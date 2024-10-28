import React, { useState, useEffect } from "react";
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

import classes from "./MessageList.module.css";

export const MessageList = ({ activeChatId }) => {
  const { data: messages = [], isLoading } = useGetMessagesQuery();
  const [sendMessage] = useSendMessageMutation();
  const [messagesSocket, setMessagesFromSocket] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [deleteMessage] = useDeleteMessageMutation();
  const { t } = useTranslation();

  useSocketSetup();

  useEffect(() => {
    const handleNewMessage = (event) => {
      setMessagesFromSocket((prev) => {
        if (prev.find((msg) => msg.id === event.id)) return prev;
        return [...prev, event];
      });
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage); // Используем socket.off для удаления обработчика события newMessage, когда компонент размонтируется.
    };
  }, []);

  const uniqueFiltredMessages = [
    ...messages.filter((message) => activeChatId === message.channelId),
    ...messagesSocket.filter((message) => activeChatId === message.channelId),
  ].reduce((acc, current) => {
    if (!acc.find((msg) => msg.id === current.id)) {
      acc.push(current);
    }
    return acc;
  }, []);

  const sendMessageHandler = async () => {
    if (newMessage) {
      const cleanMessage = leoProfanity.clean(newMessage);
      try {
        await sendMessage({
          body: cleanMessage,
          channelId: activeChatId,
          username: "anastasiia", // TODO Здесь нужно использовать реальное имя пользователя
        }).unwrap(); // unwrap метод, который обеспечивает корректную работу всех дополнительных пропов из useSendMessageMutation
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
      // После успешного удаления сообщения обновляем локальное состояние
      setMessagesFromSocket((prev) => prev.filter((msg) => msg.id !== id));
      // Отправляем событие удаления по WebSocket
      socket.emit("deleteMessage", id);
    } catch (err) {
      console.error("Ошибка при удалении сообщения:", err);
    }
  };

  if (isLoading) return <h1>{t("Загрузка...")}</h1>;

  return (
    <div className={classes.messageList}>
      <MessageHeader />
      <ul className={classes.messageItem}>
        {uniqueFiltredMessages?.map((message) => (
          <li
            key={message.id}
            onClick={() => {
              handleDeleteMessage(message.id);
            }}
          >
            <strong>{message.username}</strong>
            {message.body}
          </li>
        ))}
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
          {/* <img src={faPapperPlane} alt={t("")}/> */}
        </button>
      </form>
    </div>
  );
};
