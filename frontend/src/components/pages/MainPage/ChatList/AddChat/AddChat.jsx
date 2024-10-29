import React, { useEffect, useId, useRef } from "react";
import { Modal } from "../../../../ui/Modals/Modal";
import { useFormik } from "formik";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import {
  useAddChatMutation,
  useGetChatsQuery,
} from "../../../../../api/chatsApi";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import leoProfanity from "leo-profanity";


export const AddChat = ({ isVisible, setIsVisible }) => {
  const [addChat] = useAddChatMutation();
  const { data: chatList = [] } = useGetChatsQuery();
  const id = useId();
  const inputRef = useRef();
  const { t } = useTranslation();

  const handleSubmit = async (values) => {
    const cleanChatName = leoProfanity.clean(values.newChatName);
    await addChat({ id, name: cleanChatName, removable: true });
    toast.success(t("Канал создан"));
    setIsVisible(false);
  };

  const chatNamesList = chatList.map((chat) => chat.name);

  const formik = useFormik({
    initialValues: {
      newChatName: "",
    },
    onSubmit: handleSubmit,
    validationSchema: Yup.object({
      newChatName: Yup.string()
        .required(t("Обязательное поле"))
        .min(3, t("minSymbol_few", { count: 3 }))
        .test(
          "unique-chat",
          t("Чат с таким названием уже существует"),
          (value) => !chatNamesList.includes(leoProfanity.clean(value)) // проверка на уникальность очищенного названия
        ),
    }),
  });

  useEffect(() => {
    if (isVisible) {
      inputRef.current?.focus();
    }
  }, [isVisible]);

  const content = (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup controlId="newChatName">
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
        <button type="submit" className="btn btn-primary mt-2">
          {t("Отправить")}
        </button>
      </FormGroup>
    </Form>
  );

  return (
    <Modal
      headerTitle={t("Добавить чат")}
      content={content}
      isVisible={isVisible}
      onClose={() => setIsVisible(false)}
    />
  );
};
