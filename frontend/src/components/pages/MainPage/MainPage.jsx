import React, { useState } from "react";
import { ChannelList } from "./ChannelList/ChannelList";
import { MessageList } from "./MessageList/MessageList";
import { ToastContainer } from "react-toastify";

import classes from "./MainPage.module.css";

export const MainPage = React.memo(() => {
  const [activeChannelId, setActiveChannelId] = useState(null);

  return (
    <div className={classes.content}>
      <ChannelList setActiveChannelId={setActiveChannelId} activeChannelId={activeChannelId} />
      <MessageList activeChannelId={activeChannelId} />
      <ToastContainer />
    </div>
  );
});
