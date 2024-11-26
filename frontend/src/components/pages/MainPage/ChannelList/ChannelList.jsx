import React, { useEffect, useState } from "react";
import { useGetChannelsQuery } from "../../../../api/channelsApi";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { AddChannel } from "./AddChannel/AddChannel";
import { RenameChannel } from "./RenameChannel/RenameChannel";
import { DeleteChannel } from "./DeleteChannel/DeleteChannel";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";

import classes from "./ChannelList.module.css";

export const ChannelList = React.memo(({ activeChannelId, setActiveChannelId }) => {
  const { data: channelList = [] } = useGetChannelsQuery();
  const { t } = useTranslation();
  const [isVisibleAddChannelModal, setIsVisibleAddChannelModal] = useState(false);
  const [isVisibleRenameChannelModal, setIsVisibleRenameChannelModal] =
    useState(false);
  const [isVisibleDeleteChannelModal, setIsVisibleDeleteChannelModal] =
    useState(false);

  const handlerClick = (id) => {
    setActiveChannelId(id);
  };

  const activeClass = `${classes.active} ${classes.item}`;

  // const testHendelClick = () => {
  //   console.log(channelList[channelList.length + 1].id);
  // };

  useEffect(() => {
    if (channelList.length > 0) {
      setActiveChannelId(channelList[0].id);
    }
  }, [channelList, setActiveChannelId]);

  return (
    <div className={classes.channelList}>
      <div className={classes.blockChannel}>
        <b className={classes.channels}>{t("Каналы")}</b>
        <button
          className={classes.buttonAddChannel}
          type="button"
          onClick={() => setIsVisibleAddChannelModal(true)}
          data-testid="item-add"
        >
          +
        </button>
        {/* <button onClick={testHendelClick}>тест</button> */}
      </div>
      <ul className={classes.chatlList}>
        {channelList?.map((item) => (
          <li
            key={item.id}
            onClick={() => handlerClick(item.id)}
            className={
              activeChannelId === item.id ? activeClass : `${classes.item}`
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
                  onClick={() => setIsVisibleRenameChannelModal(true)}
                >
                  {t("Переименовать")}
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => setIsVisibleDeleteChannelModal(true)}
                >
                  {t("Удалить")}
                </Dropdown.Item>
              </DropdownButton>
            ) : null}
          </li>
        ))}
      </ul>

      {isVisibleAddChannelModal && (
        <AddChannel
          isVisible={isVisibleAddChannelModal}
          setIsVisible={setIsVisibleAddChannelModal}
        />
      )}
      {isVisibleRenameChannelModal && (
        <RenameChannel
          activeChannelId={activeChannelId}
          isVisible={isVisibleRenameChannelModal}
          setIsVisible={setIsVisibleRenameChannelModal}
        />
      )}
      {isVisibleDeleteChannelModal && (
        <DeleteChannel
          channelId={activeChannelId}
          isVisible={isVisibleDeleteChannelModal}
          setIsVisible={setIsVisibleDeleteChannelModal}
        />
      )}
    </div>
  );
});
