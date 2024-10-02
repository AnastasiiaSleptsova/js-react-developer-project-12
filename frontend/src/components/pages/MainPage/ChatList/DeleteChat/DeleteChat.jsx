import { useRemoveChatMutation } from "../../../../../api/chatsApi";
import { Modal } from "../../../../ui/Modals/Modal";
import { Button } from "react-bootstrap";

export const DeleteChat = ({ chatId, chatName, isVisible, setIsVisible }) => {
  const [removeChat] = useRemoveChatMutation();

  const handleClick = async () => {
    await removeChat(chatId);
    setIsVisible(false);
  };

  const content = (
    <div>
      <h3>Вы действительно хотите удалить канал {chatName}</h3>
      <Button onClick={() => setIsVisible(false)}>Отмена</Button>
      <Button variant="danger" onClick={handleClick}>
        Удалить
      </Button>
    </div>
  );

  return (
    <Modal
      headerTitle="Удалить канал"
      content={content}
      isVisible={isVisible}
      onClose={() => setIsVisible(false)}
    />
  );
};
