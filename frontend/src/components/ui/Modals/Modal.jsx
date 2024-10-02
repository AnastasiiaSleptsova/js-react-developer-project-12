import React from "react";
import { Modal as BootstrapModal} from "react-bootstrap";
import { BaseModal } from "./BaseModal";

export const Modal = ({ onSuccess = () => {}, isVisible, onClose = () => {}, headerTitle, content }) => {
  return (
    <BaseModal
      header={<BootstrapModal.Title>{headerTitle}</BootstrapModal.Title>}
      onSuccess ={onSuccess}
      isVisible={isVisible}
      onClose ={onClose} 
      content={content}
    />
  )
};
