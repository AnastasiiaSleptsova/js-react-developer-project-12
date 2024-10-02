import { useEffect, useId, useRef } from "react";
import { Modal } from "../../../../ui/Modals/Modal";
import { useFormik } from "formik";
import { FormControl, FormGroup } from "react-bootstrap";
import { useAddChatMutation } from "../../../../../api/chatsApi";

const AddChat = ({ isVisible, setIsVisible }) => {
  const [addChat] = useAddChatMutation();
  const id = useId();

  const handleSubmit = async (values) => {
    console.log("!!! values = ", values);
    addChat({ id, name: values.newChatName, removable: true });
    setIsVisible(false);
  };

  const formik = useFormik({
    initialValues: {
      newChatName: "",
    },
    onSubmit: handleSubmit,
  });

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
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
        <input type="submit" className="btn btn-primary mt-2" value="submit" />
      </FormGroup>
    </form>
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

export default AddChat;
