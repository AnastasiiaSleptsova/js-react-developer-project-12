import React, {useState} from "react";
import "./MainPage.css";
import Header from "../../ui/Header/Header";
import { ChatList } from "./ChatList/ChatList";
import { MessageList } from "./MessageList/MessageList";

const MainPage = React.memo(() => {
  const [activeChatId, setActiveChatId] = useState(null);

  return (
    <div className="wrapper">
      <Header />
      <div className="chatBox">
        <ChatList setActiveChatId={setActiveChatId} activeChatId={activeChatId} />
        <MessageList activeChatId={activeChatId}/>
      </div>
    </div>
  );
})

export default MainPage;
