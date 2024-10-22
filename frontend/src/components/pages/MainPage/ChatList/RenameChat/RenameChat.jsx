import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import {
  useGetChatsQuery,
  useRenameChatMutation,
} from "../../../../../api/chatsApi";
import { Modal } from "../../../../ui/Modals/Modal";
import { FormGroup, FormControl, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RenameChat = ({ activeChatId, isVisible, setIsVisible }) => {
  const [renameChat] = useRenameChatMutation();
  const { data: chatList = [] } = useGetChatsQuery();
  const { t } = useTranslation();

  const chatNamesList = chatList.map((chat) => chat.name);
  const chatName = chatList.find((chat) => chat.id === activeChatId)?.name;

  const handleSubmit = async (values) => {
    await renameChat({ id: activeChatId, name: values.newChatName });
    toast.success(t("toastForRenameChannel"));
    setIsVisible(false);
  };

  const formik = useFormik({
    initialValues: { newChatName: chatName },
    onSubmit: handleSubmit,
    validationSchema: Yup.object({
      newChatName: Yup.string()
        .required(t("requiredField"))
        .min(3, t("minSymbol_few", { count: 3 }))
        .test(
          "unique-chat",
          t("channelNameBusy"),
          (value) => !chatNamesList.includes(value)
        ),
    }),
  });

  const inputRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isVisible]);

  const content = (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <FormControl
          required
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newChatName}
          data-testid="input-body"
          name="newChatName"
          isInvalid={!!formik.errors.newChatName && formik.touched.newChatName}
        />
        {formik.touched.newChatName && formik.errors.newChatName ? (
          <Form.Control.Feedback type="invalid">
            {formik.errors.newChatName}
          </Form.Control.Feedback>
        ) : null}
      </FormGroup>
      <input type="submit" className="btn btn-primary mt-2" value="submit" />
    </Form>
  );

  return (
    <Modal
      headerTitle={t("renameChannel")}
      content={content}
      isVisible={isVisible}
      onClose={() => setIsVisible(false)}
    />
  );
};
