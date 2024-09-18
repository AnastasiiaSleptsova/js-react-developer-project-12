import React, { useState } from "react";
import "./MainPage.css";
import Header from "../../ui/Header/Header";
import { ChatList } from "./ChatList/ChatList";
import { MessageList } from "./MessageList/MessageList";
import { Footer } from "../Footer/Footer";

const MainPage = React.memo(() => {
  const [activeChatId, setActiveChatId] = useState(null);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <ChatList
          setActiveChatId={setActiveChatId}
          activeChatId={activeChatId}
        />
        <MessageList activeChatId={activeChatId} />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
});

export default MainPage;
