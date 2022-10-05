import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isLoading, isOpen, onClose, onUpdateAvatar }) => {
  const url = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(url.current.value);
  }
  return (
    <PopupWithForm
      title="Change Profile Picture"
      name="popup_type_avatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Saving..." : "Save"}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <div className="form__input-container">
          <input
            id="avatar-input"
            type="url"
            name="link"
            placeholder="Profile Image link"
            className="form__input form__input_type_avatar"
            required
            ref={url}
          />
          <span className="form__input-error avatar-input-error" />
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
