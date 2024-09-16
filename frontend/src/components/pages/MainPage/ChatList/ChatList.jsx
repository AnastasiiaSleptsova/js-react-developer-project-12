import React, { useEffect, useState } from "react";
import { useGetChatsQuery } from "../../../../api/chatsApi";

import "./ChatList.css";

export const ChatList = React.memo(({
  activeChatId,
  setActiveChatId, 
}) => {
  const { data = [] } = useGetChatsQuery();

  const handlerClick = (id) => {
    setActiveChatId(id);
  }

  useEffect(() => {
    setActiveChatId(data[0]?.id)
  }, [data, setActiveChatId])

  return (
    <div className="chatList">
      <ul>
        {data?.map((item) => {
        return (
          <li 
          key={item.id} 
          onClick={() => handlerClick(item.id)} 
          className={activeChatId === item.id ? 'active item' : 'item'}
          >
            <h2>{item.name}</h2>
          </li>
        );
      })}
      </ul>
    </div>
  );
})
