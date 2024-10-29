import React from "react";
import { Modal } from "react-bootstrap";

export const BaseModal = ({ onSuccess = () => {}, isVisible, onClose = () => {}, content, header }) => {
  return (
    <Modal show={isVisible}>
      <Modal.Header closeButton onHide={onClose}>
        {header}
      </Modal.Header>

      <Modal.Body>
        {content}
      </Modal.Body>
    </Modal>
  )
};
