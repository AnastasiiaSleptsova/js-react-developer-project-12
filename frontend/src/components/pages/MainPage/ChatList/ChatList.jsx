import React, { useEffect, useState } from "react";
import { useGetChatsQuery } from "../../../../api/chatsApi";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { AddChat } from "./AddChat/AddChat";
import { RenameChat } from "./RenameChat/RenameChat";
import { DeleteChat } from "./DeleteChat/DeleteChat";
import { useTranslation } from "react-i18next";

import classes from "./ChatList.module.css";

export const ChatList = React.memo(({ activeChatId, setActiveChatId }) => {
  const { data: chatList = [] } = useGetChatsQuery();
  const { t } = useTranslation();

  const [isVisibleAddChatModal, setIsVisibleAddChatModal] = useState(false);
  const [isVisibleRenameChatModal, setIsVisibleRenameChatModal] =
    useState(false);
  const [isVisibleDeleteChatModal, setIsVisibleDeleteChatModal] =
    useState(false);

  const handlerClick = (id) => {
    setActiveChatId(id);
  };

  const activeClass = `${classes.active} ${classes.item}`;

  useEffect(() => {
    if (chatList.length > 0) {
      setActiveChatId(chatList[0].id);
    }
  }, [chatList, setActiveChatId]);

  return (
    <div className={classes.chatList}>
      <div className={classes.blockChannel}>
        <b className={classes.channels}>{t("channels")}</b>
        <button
          className={classes.buttonAddChat}
          type="button"
          onClick={() => setIsVisibleAddChatModal(true)}
          data-testid="item-add"
        >
          +
        </button>
      </div>
      <ul className={classes.channelList}>
        {chatList?.map((item) => (
          <li
            key={item.id}
            onClick={() => handlerClick(item.id)}
            className={
              activeChatId === item.id ? activeClass : `${classes.item}`
            }
          >
            <h2 className={classes.text}>
              <span>#</span> {item.name}
            </h2>
            {item.removable ? (
              <DropdownButton
                className={classes.dropdown}
                id="dropdown-basic-button"
                variant="link"
              >
                <Dropdown.Item
                  onClick={() => setIsVisibleRenameChatModal(true)}
                >
                  {t("rename")}
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => setIsVisibleDeleteChatModal(true)}
                >
                  {t("delete")}
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
