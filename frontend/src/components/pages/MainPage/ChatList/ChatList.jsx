import React, { useEffect, useState } from "react";
import { useGetChatsQuery } from "../../../../api/chatsApi";
import { Dropdown, DropdownButton } from "react-bootstrap"; // Используем Bootstrap для выпадающего меню
import { AddChat } from "./AddChat/AddChat";
import { RenameChat } from "./RenameChat/RenameChat";
import { DeleteChat } from "./DeleteChat/DeleteChat";

import "./ChatList.css";

export const ChatList = React.memo(({ activeChatId, setActiveChatId }) => {
  const { data: chatList = [] } = useGetChatsQuery();

  const [isVisibleAddChatModal, setIsVisibleAddChatModal] = useState(false);
  const [isVisibleRenameChatModal, setIsVisibleRenameChatModal] =
    useState(false);
  const [isVisibleDeleteChatModal, setIsVisibleDeleteChatModal] =
    useState(false);

  const handlerClick = (id) => {
    setActiveChatId(id);
  };

  useEffect(() => {
    // Устанавливаем активный чат по умолчанию после загрузки данных
    if (chatList.length > 0) {
      setActiveChatId(chatList[0].id);
    }
  }, [chatList, setActiveChatId]);

  return (
    <div className="chatList">
      <div className="blockChannel">
        <b className="channels">Каналы</b>
        <button
          className="buttonAddChat"
          type="button"
          onClick={() => setIsVisibleAddChatModal(true)}
          data-testid="item-add"
        >
          +
        </button>
      </div>
      <ul className="channelList">
        {chatList?.map((item) => (
          <li
            key={item.id}
            onClick={() => handlerClick(item.id)}
            className={activeChatId === item.id ? "active item" : "item"}
          >
            <h2 className="text">
              <span>#</span> {item.name}
            </h2>
            {item.removable ? (
              <DropdownButton
                className="dropdown"
                id="dropdown-basic-button"
                variant="link"
              >
                <Dropdown.Item
                  onClick={() => setIsVisibleRenameChatModal(true)}
                >
                  Переименовать
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => setIsVisibleDeleteChatModal(true)}
                >
                  Удалить
                </Dropdown.Item>
              </DropdownButton>
            ) : null}
          </li>
        ))}
      </ul>

      {isVisibleAddChatModal && (
        <AddChat
          isVisible={isVisibleAddChatModal}
          setIsVisible={setIsVisibleAddChatModal}
        />
      )}

      {isVisibleRenameChatModal && (
        <RenameChat
          activeChatId={activeChatId}
          isVisible={isVisibleRenameChatModal}
          setIsVisible={setIsVisibleRenameChatModal}
        />
      )}
      {isVisibleDeleteChatModal && (
        <DeleteChat
          chatId={activeChatId}
          isVisible={isVisibleDeleteChatModal}
          setIsVisible={setIsVisibleDeleteChatModal}
        />
      )}
    </div>
  );
});
