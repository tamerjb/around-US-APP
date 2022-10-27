import React, { useEffect, useContext, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isLoading, isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);
  const handleNameChange = e => {
    setName(e.target.value);
  };
  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }
  return (
    <PopupWithForm
      title="Edit profile"
      name="popup-edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Saving...' : 'Save'}
    >
      <fieldset className="form__fieldset">
        <div className="form__input-container">
          <input
            id="name-input"
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            className="form__input form__input_type_profile-name"
            minLength="2"
            maxLength="40"
            onChange={handleNameChange}
            required
            autoComplete="off"
          />
          <span className="form__input-error name-input-error" />
        </div>
        <div className="form__input-container">
          <input
            id="title-input"
            type="text"
            name="title"
            placeholder="About me"
            className="form__input form__input_type_profile-title"
            minLength="2"
            maxLength="200"
            onChange={handleDescriptionChange}
            required
            value={description}
            autoComplete="off"
          />
          <span className="form__input-error title-input-error" />
        </div>
      </fieldset>
    </PopupWithForm>
  );
};
export default EditProfilePopup;
