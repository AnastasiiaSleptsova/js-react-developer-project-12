import React, { useState, useEffect } from "react";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
} from "../../../../api/messagesApi";
import { MessageHeader } from "./MessageHeader/MessageHeader";
import { useSocketSetup } from "../../../../api/socket/useSocketSetup";
import { socket } from "../../../../api/socket/socket";

import "./MessageList.css";

export const MessageList = ({ activeChatId }) => {
  const { data: messages = [], isLoading } = useGetMessagesQuery();
  const [sendMessage] = useSendMessageMutation();
  const [messagesSocket, setMessagesFromSocket] = useState([]);
  const [newMessage, setNewMessage] = useState(""); // Хранение нового сообщения
  const [deleteMessage] = useDeleteMessageMutation();

  useSocketSetup();

  useEffect(() => {
    const handleNewMessage = (event) => {
      setMessagesFromSocket((prev) => {
        // Проверяем, есть ли уже сообщение с таким же ID
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
    // Убираем дубликаты по id
    if (!acc.find((msg) => msg.id === current.id)) {
      acc.push(current);
    }
    return acc;
  }, []);


  // Обработчик отправки сообщения
  const sendMessageHandler = async () => {
    if (newMessage) {
      try {
        await sendMessage({
          // Отправка сообщения через API
          body: newMessage,
          channelId: activeChatId,
          username: "anastasiia", // TODO Здесь нужно использовать реальное имя пользователя
        }).unwrap(); // unwrap метод, который обеспечивает корректную работу всех дополнительных пропов из useSendMessageMutation
        setNewMessage(""); // Очистка поля после отправки
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

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="messageList">
      <MessageHeader />
      <ul className="messageItem">
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

      <form className="placeForMessage" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Введите сообщение..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

