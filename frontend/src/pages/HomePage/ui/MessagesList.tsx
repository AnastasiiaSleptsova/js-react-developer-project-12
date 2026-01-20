import { Alert, Empty, List, Skeleton } from "antd";

import { useMessages } from "@features/chat";
import { useAppSelector } from "@app/store";

export const MessagesList = () => {
  const selectedChannelId = useAppSelector(
    (state) => state.chat.selectedChannelId
  );
  const { data: messages = [], isLoading, error } = useMessages();

  if (!selectedChannelId) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
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

  if (filteredMessages.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Empty description="Нет сообщений в этом канале" />
      </div>
    );
  }

  return (
    <List
      dataSource={filteredMessages}
      renderItem={(message) => (
        <List.Item key={message.id}>
          <List.Item.Meta
            title={`👤 ${message.username}`}
            description={message.body}
          />
        </List.Item>
      )}
    />
  );
};
