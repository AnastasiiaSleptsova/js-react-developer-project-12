import React from "react";
import { useGetMessagesQuery } from "../../../../api/messagesApi";
import { Input } from "../../../ui/Input/Input";
import { Button } from "../../../ui/Button/Button";
import { MessageHeader } from "./MessageHeader/MessageHeader";
import './MessageList.css';

export const MessageList = ({ activeChatId }) => {
  const { data } = useGetMessagesQuery();
  const activeChatMessages = data?.filter(
    (message) => activeChatId === message.chanelId
  );

  return (
    <div className="messageList">
      <MessageHeader/>
      <ul className="messageItem">
        {activeChatMessages?.map((message) => {
          return <li key={message.id}>{message.body}</li>;
        })}
      </ul>
      <form className="placeForMessage">
        <Input />
        <Button />
      </form>
    </div>
  );
};
