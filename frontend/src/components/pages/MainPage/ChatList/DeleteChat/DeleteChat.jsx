import { useRemoveChatMutation } from "../../../../../api/chatsApi";
import { Modal } from "../../../../ui/Modals/Modal";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";


export const DeleteChat = ({ chatId, chatName, isVisible, setIsVisible }) => {
  const [removeChat] = useRemoveChatMutation();
  const { t } = useTranslation();


  const handleClick = async () => {
    await removeChat(chatId);
    setIsVisible(false);
  };

  const content = (
    <div>
      <h3>{t("areYouSure")} {chatName} ?</h3>
      <Button onClick={() => setIsVisible(false)}>{t("cancel")}</Button>
      <Button variant="danger" onClick={handleClick}>
      {t("delete")}
      </Button>
    </div>
  );

  return (
    <Modal
      headerTitle={t("deleteChannel")}
      content={content}
      isVisible={isVisible}
      onClose={() => setIsVisible(false)}
    />
  );
};
