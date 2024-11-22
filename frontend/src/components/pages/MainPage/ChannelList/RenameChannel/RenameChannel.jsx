import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import {
  useGetChannelsQuery,
  useRenameChannelMutation,
} from "../../../../../api/channelsApi";
import { Modal } from "../../../../ui/Modals/Modal";
import { FormGroup, FormControl, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RenameChannel = ({ activeChannelId, isVisible, setIsVisible }) => {
  const [renameChannel] = useRenameChannelMutation();
  const { data: channelList = [] } = useGetChannelsQuery();
  const { t } = useTranslation();

  const channelNamesList = channelList.map((channel) => channel.name);
  const channelName = channelList.find((channel) => channel.id === activeChannelId)?.name;

  const handleSubmit = async (values) => {
    await renameChannel({ id: activeChannelId, name: values.newChannelName });
    toast.success(t("Канал переименован"));
    setIsVisible(false);
  };

  const formik = useFormik({
    initialValues: { newChannelName: channelName },
    onSubmit: handleSubmit,
    validationSchema: Yup.object({
      newChannelName: Yup.string()
        .required(t("Обязательное поле"))
        .min(3, t("minSymbol_few", { count: 3 }))
        .test(
          "unique-channel",
          t("Чат с таким названием уже существует"),
          (value) => !channelNamesList.includes(value)
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
      </FormGroup>
      <input type="submit" className="btn btn-primary mt-2" value="submit" />
    </Form>
  );

  return (
    <Modal
      headerTitle={t("Изменить название чата")}
      content={content}
      isVisible={isVisible}
      onClose={() => setIsVisible(false)}
    />
  );
};
