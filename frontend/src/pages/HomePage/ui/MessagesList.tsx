import { Alert, Empty, Skeleton, Layout } from "antd";

import { useMessages } from "@features/chat";
import { useAppSelector } from "@app/store";
import { MessageInput } from "./MessageInput";
import styles from "./MessagesList.module.scss";

export const MessagesList = () => {
  const selectedChannelId = useAppSelector(
    (state) => state.chat.selectedChannelId
  );
  const currentUsername = useAppSelector((state) => state.auth.username);
  const { data: messages = [], isLoading, error } = useMessages();

  if (!selectedChannelId) {
    return (
      <div className={styles.emptyPlaceholder}>
        <Empty description="Выберите канал для просмотра сообщений" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ padding: "16px" }}>
        <Skeleton active paragraph={{ rows: 5 }} />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Ошибка"
        description="Не удалось загрузить сообщения"
        type="error"
      />
    );
  }

  const filteredMessages = messages.filter((msg) => msg.channelId === selectedChannelId);

  return (
    <Layout className={styles.contentLayout}>
      <Layout.Content className={styles.layoutContent}>
        {filteredMessages.length === 0 ? (
          <div className={styles.emptyPlaceholder}>
            <Empty description="Нет сообщений в этом канале" />
          </div>
        ) : (
          <div className={styles.messagesList}>
            <div className={styles.messagesContainer}>
              {filteredMessages.map((message) => {
                const isCurrentUser = message.username === currentUsername;
                return (
                  <div
                    key={message.id}
                    className={`${styles.messageItem} ${
                      isCurrentUser ? styles.isCurrentUser : styles.isOtherUser
                    }`}
                  >
                    <div className={styles.messageBubble}>
                      <span className={styles.username}>{message.username}</span>
                      <p className={styles.body}>{message.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Layout.Content>
      <MessageInput />
    </Layout>
  );
};

