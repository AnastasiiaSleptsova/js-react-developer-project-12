import React from "react";
import { useGetChannelsQuery } from "../../../../../api/channelsApi";
import { useGetMessagesQuery } from "../../../../../api/messagesApi";
import { useTranslation } from "react-i18next";

import classes from "./MessageHeader.module.css";

export const MessageHeader = ({ activeChannelId }) => {
  const { data: messages = [], isLoading } = useGetMessagesQuery();
  const { data: channelList = [] } = useGetChannelsQuery();
  const activeChannelName = channelList.find(
    (channel) => activeChannelId === channel.id
  );
  const { t } = useTranslation();

  const countMessageText = (number) => {
    let newNumber = number % 100;
    if (newNumber >= 5 && newNumber <= 20) {
      return t("messages_many", { count: number });
    }
    newNumber = number % 10;
    if (newNumber === 1) {
      return t("messages_one", { count: number });
    }
    if (newNumber >= 2 && newNumber <= 4) {
      return t("messages_few", { count: number });
    }
    return t("messages_many", { count: number });
  };

  const countMessage = messages.filter(
    (message) => activeChannelId === message.channelId
  );
  return (
    <div className={classes.messageHeader}>
      <div className={classes.text}># {activeChannelName?.name}</div>
      <div className={classes.count}>
        {countMessageText(countMessage.length)}
      </div>
    </div>
  );
};
