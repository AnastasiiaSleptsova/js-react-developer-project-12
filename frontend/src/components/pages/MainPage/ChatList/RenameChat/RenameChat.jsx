import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useRenameChatMutation } from "../../../../../api/chatsApi";
import { Modal } from "../../../../ui/Modals/Modal";
import { FormGroup, FormControl } from "react-bootstrap";

export const RenameChat = ({ chatId, chatName, isVisible, setIsVisible }) => {
  const [renameChat] = useRenameChatMutation();

  const handleSubmit = async (values) => {
    console.log("!!! values.id = ", values.id);
    await renameChat({id: chatId, name: values.newChatName});
    setIsVisible(false)
  };

  const formik = useFormik({
    initialValues: { newChatName: chatName },
    onSubmit: handleSubmit,
  });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const content = (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <FormControl
          required
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newChatName}
          data-testid="input-body"
          name="newChatName"
        />
      </FormGroup>
      <input type="submit" className="btn btn-primary mt-2" value="submit" />
    </form>
  );

  return (
    <Modal
      headerTitle="Изменить название чата"
      content={content}
      isVisible={isVisible}
      onClose={() => setIsVisible(false)}
    />
  );
};
