import React from "react";
import { useGetMessagesQuery } from "../../../../api/messagesApi";

export const MessageList = ({
  activeChatId
}) => {
  const { data } = useGetMessagesQuery();
  const activeChatMessages = data?.filter((message) => activeChatId === message.chanelId)
  
  return (
    <ul>
      {activeChatMessages?.map((message) => {
        return <li key={message.id}>{message.body}</li>;
      })}
    </ul>
  );
};
