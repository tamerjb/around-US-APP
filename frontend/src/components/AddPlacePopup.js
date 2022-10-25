import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isLoading, isOpen, onClose, onAddPlaceSubmit }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({ name, link });
  }
  useEffect(() => {
    if (isOpen) {
      // reset name
      setName('');
      // reset link
      setLink('');
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="New place"
      name="popup-place"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? 'Saving...' : 'Create'}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <div className="form__input-container">
          <input
            id="place-title-input"
            type="text"
            name="name"
            placeholder="Title"
            className="form__input form__input_type_place-name"
            required
            minLength="1"
            maxLength="30"
            onChange={handleNameChange}
            value={name}
          />
          <span className="form__input-error place-title-input-error"></span>
        </div>
        <div className="form__input-container">
          <input
            id="place-url-input"
            type="url"
            name="link"
            placeholder="Image link"
            className="form__input form__input_type_place-url"
            required
            onChange={handleLinkChange}
            value={link}
          />
          <span className="form__input-error place-url-input-error" />
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
