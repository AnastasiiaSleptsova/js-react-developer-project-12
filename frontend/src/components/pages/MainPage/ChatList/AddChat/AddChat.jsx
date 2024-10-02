import React, { useEffect, useId, useRef } from "react";
import { Modal } from "../../../../ui/Modals/Modal";
import { useFormik } from "formik";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import { useAddChatMutation, useGetChatsQuery } from "../../../../../api/chatsApi";
import * as Yup from 'yup'

export const AddChat = ({ isVisible, setIsVisible }) => {
  const [addChat] = useAddChatMutation();
  const {data: chatList = []} = useGetChatsQuery();
  const id = useId();
  const inputRef = useRef();

  const handleSubmit = async (values) => {
    await addChat({ id, name: values.newChatName, removable: true });
    setIsVisible(false);
  };

  const chatNamesList = chatList.map(chat => chat.name)

  const formik = useFormik({
    initialValues: {
      newChatName: "",
    },
    onSubmit: handleSubmit,
    validationSchema: Yup.object({
      newChatName: Yup.string()
        .required('Обязательное поле')
        .min(3, 'Значение должно быть больше 3 символов')
        .test('unique-chat', 'Чат с таким названием уже существует', (value) => !chatNamesList.includes(value))
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
        <input type="submit" className="btn btn-primary mt-2" value="Отправить" />
      </FormGroup>
    </Form>
  );

  return (
    <Modal
      headerTitle="Добавить чат"
      content={content}
      isVisible={isVisible}
      onClose={() => setIsVisible(false)}
    />
  );
};


