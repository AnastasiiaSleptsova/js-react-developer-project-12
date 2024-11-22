import React, { useEffect, useId, useRef } from "react";
import { Modal } from "../../../../ui/Modals/Modal";
import { useFormik } from "formik";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import {
  useAddChannelMutation,
  useGetChannelsQuery,
} from "../../../../../api/channelsApi";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import leoProfanity from "leo-profanity";

export const AddChannel = ({ isVisible, setIsVisible }) => {
  const [addChannel] = useAddChannelMutation();
  const { data: channelList = [] } = useGetChannelsQuery();
  const id = useId();
  const inputRef = useRef();
  const { t } = useTranslation();

  const handleSubmit = async (values) => {
    const cleanChannelName = leoProfanity.clean(values.newChannelName);
    await addChannel({ id, name: cleanChannelName, removable: true });
    toast.success(t("Канал создан"));
    setIsVisible(false);
  };

  const channelNamesList = channelList.map((channel) => channel.name);

  const formik = useFormik({
    initialValues: {
      newChannelName: "",
    },
    onSubmit: handleSubmit,
    validationSchema: Yup.object({
      newChannelName: Yup.string()
        .required(t("Обязательное поле"))
        .min(3, t("minSymbol_few", { count: 3 }))
        .max(20, t("maxSymbol_many", { count: 20 }))
        .test(
          "unique-channel",
          t("Чат с таким названием уже существует"),
          (value) => !channelNamesList.includes(leoProfanity.clean(value)) // проверка на уникальность очищенного названия
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
      <FormGroup controlId="newChannelName">
        <FormControl
          required
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newChannelName}
          data-testid="input-body"
          name="newChannelName"
          isInvalid={!!formik.errors.newChannelName && formik.touched.newChannelName}
        />
        {formik.touched.newChannelName && formik.errors.newChannelName ? (
          <Form.Control.Feedback type="invalid">
            {formik.errors.newChannelName}
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
