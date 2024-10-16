import React, { useState } from "react";
import { ChatList } from "./ChatList/ChatList";
import { MessageList } from "./MessageList/MessageList";

import classes from "./MainPage.module.css";

export const MainPage = React.memo(() => {
  const [activeChatId, setActiveChatId] = useState(null);

  return (
    <div className={classes.content}>
      <ChatList setActiveChatId={setActiveChatId} activeChatId={activeChatId} />
      <MessageList activeChatId={activeChatId} />
    </div>
  );
});

