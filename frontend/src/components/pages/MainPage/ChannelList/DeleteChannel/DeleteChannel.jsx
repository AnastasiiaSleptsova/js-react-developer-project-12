import { useRemoveChannelMutation } from "../../../../../api/channelsApi";
import { Modal } from "../../../../ui/Modals/Modal";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DeleteChannel = ({ channelId, channelName, isVisible, setIsVisible }) => {
  const [removeChannel] = useRemoveChannelMutation();
  const { t } = useTranslation();


  const handleClick = async () => {
    await removeChannel(channelId);
    toast.success(t("Канал удалён"));
    setIsVisible(false);
  };

  const content = (
    <div>
      <h3>{t("Вы действительно хотите удалить канал")} {channelName} ?</h3>
      <Button onClick={() => setIsVisible(false)}>{t("Отмена")}</Button>
      <Button variant="danger" onClick={handleClick}>
      {t("Удалить")}
      </Button>
    </div>
  );

  return (
    <Modal
      headerTitle={t("Удалить чат")}
      content={content}
      isVisible={isVisible}
      onClose={() => setIsVisible(false)}
    />
  );
};
