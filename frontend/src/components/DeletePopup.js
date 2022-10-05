import React from "react";
import PopupWithForm from "./PopupWithForm";

const DeletePopup = ({ isLoading, isOpen, onClose, onSubmitDelete }) => {
  return (
    <PopupWithForm
      title="Are you sure?"
      name="delete-card"
      buttonText={isLoading ? "Deleting..." : "Yes"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmitDelete}
    />
  );
};

export default DeletePopup;
